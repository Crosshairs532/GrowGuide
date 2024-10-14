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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const post_model_1 = require("./post.model");
const createPostDb = (postData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(postData);
    const posted = (yield post_model_1.postModel.create(postData)).populate('user');
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
const UpDownVoteDb = (postId, val) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield post_model_1.postModel.findByIdAndUpdate({ _id: postId }, {
        $inc: {
            votes: parseInt(val),
        },
    }, {
        new: true,
    });
    return res;
});
const getAllPostsDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield post_model_1.postModel
        .find({})
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path: 'userId',
        },
    });
    return res;
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
    const { post: { _id }, } = updatedData;
    const res = yield post_model_1.postModel.findByIdAndUpdate({
        _id,
    }, updatedData, {
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
exports.postService = {
    createPostDb,
    createCommentDb,
    UpDownVoteDb,
    getAllPostsDb,
    postDeleteDb,
    postUpdateDb,
    postCommentDb,
    PostCommentUpdate,
};
