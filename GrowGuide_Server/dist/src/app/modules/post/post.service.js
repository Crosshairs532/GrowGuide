"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const post_model_1 = require("./post.model");
const createPostDb = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(postData, 'service')
    const posted = (yield post_model_1.postModel.create(postData)).populate('user');
    // console.log(posted)
    return posted;
});
const createCommentDb = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, commenterId, userComments } = commentData;
    //   const post = await postModel.findByIdAndUpdate(
    //     {
    //       _id: commentData.postId,
    //       'comments.userId': commenterId,
    //     },
    //     {
    //       $push: {
    //         'comments.$.userComments': userComments,
    //       },
    //     },
    //     {
    //       upsert: true,
    //       new: true,
    //     },
    //   )
    //   const post = await postModel.findOneAndUpdate(
    //     {
    //       _id: postId,
    //       'comments.userId': commenterId,
    //     },
    //     {
    //       $push: { 'comments.$.userComments': userComments },
    //     },
    //     {
    //       new: true, // Return the updated document
    //     },
    //   )
    const post = yield post_model_1.postModel
        .findOneAndUpdate({
        _id: postId,
        // 'comments.userId': commenterId,
    }, {
        $push: { comments: { userId: commenterId, userComments } },
    }, {
        new: true,
    })
        .lean();
    if (!post) {
        const addNewComment = yield post_model_1.postModel.findByIdAndUpdate({ _id: postId }, {
            $push: {
                comments: { userId: commenterId, userComments: [userComments] },
            },
        }, {
            new: true,
        });
        return addNewComment;
    }
    return post;
});
const UpDownVoteDb = (postId, val, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(postId, val, 'this is upvote service')
    const res = yield post_model_1.postModel.findByIdAndUpdate({ _id: postId }, {
        $inc: {
            votes: parseInt(val),
        },
    }, {
        new: true,
    });
    return res;
});
const getAllPostsDb = (search) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    const { category, other, nextId, limit } = search;
    if (category) {
        const categoryQueries = category.split('-').map((cat) => {
            return { categories: { $regex: cat, $options: 'i' } };
        });
        // Combine category queries into an $or condition
        query.$or = categoryQueries;
    }
    if (other) {
        query['description'] = { $regex: other, $options: 'i' };
    }
    // console.log(query)
    let lim;
    if (limit) {
        lim = limit;
        // console.log(limit)
    }
    else {
        lim = 0;
        // console.log(limit)
    }
    const res = yield post_model_1.postModel
        .find({
        $or: [query],
    })
        .sort({
        votes: -1,
    })
        .limit(lim) // Return only 1 post
        .skip(Number(nextId) || 0)
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path: 'userId',
        },
    });
    const hasMorePosts = (yield post_model_1.postModel.countDocuments(query)) > (Number(nextId) || 0) + 1;
    // console.log({ hasMorePosts })
    // console.log(hasMorePosts, ' more posts are there ')
    return {
        data: res,
        nextId: hasMorePosts ? (Number(nextId) || 0) + 1 : null, // Increment nextId if more posts are available
    };
});
const postDeleteDb = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield post_model_1.postModel.findByIdAndDelete({ _id: postId }, {
            new: true,
        });
        return res;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const postUpdateDb = (updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const { post } = updatedData, other = __rest(updatedData, ["post"]);
    const newdata = Object.assign(Object.assign({}, post), other);
    const { post: { _id }, } = updatedData;
    const res = yield post_model_1.postModel.findByIdAndUpdate({
        _id,
    }, newdata, {
        new: true,
    });
    return res;
});
const postCommentDb = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield post_model_1.postModel.findById(postId, {});
});
const PostCommentUpdate = (action_1, commentId_1, ...args_1) => __awaiter(void 0, [action_1, commentId_1, ...args_1], void 0, function* (action, commentId, updatedComment = '') {
    switch (action) {
        case 'delete':
            const res = yield post_model_1.postModel.findOneAndUpdate({
                'comments._id': commentId,
            }, {
                $pull: {
                    comments: {
                        _id: commentId,
                    },
                },
            });
            return res;
        case 'edit':
            const commentUpdated = yield post_model_1.postModel.findOneAndUpdate({
                'comments._id': commentId,
            }, {
                $set: {
                    'comments.$.userComments': updatedComment,
                },
            });
            return commentUpdated;
    }
});
const getLoggedInUserPosts = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userId)
    try {
        const res = yield post_model_1.postModel.find({ user: userId });
        return res;
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong! Cannot Get posts!');
    }
});
const postChartDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield post_model_1.postModel.aggregate([
        {
            $group: {
                _id: {
                    year: {
                        $year: '$createdAt',
                    },
                    month: {
                        $month: '$createdAt',
                    },
                },
                totalPosts: {
                    $sum: 1,
                },
                votes: { $sum: '$votes' },
            },
        },
    ]);
    return res;
});
const getSinglePostDb = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield post_model_1.postModel.findById(postId);
    return res;
});
exports.postService = {
    createPostDb,
    createCommentDb,
    UpDownVoteDb,
    getAllPostsDb,
    postDeleteDb,
    postUpdateDb,
    postCommentDb,
    PostCommentUpdate,
    getLoggedInUserPosts,
    postChartDb,
    getSinglePostDb,
};
