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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const catchAsync_1 = require("../../utilities/catchAsync");
const post_service_1 = require("./post.service");
const sendResponse_1 = require("../../utilities/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const createPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // !form data
    const postData = req === null || req === void 0 ? void 0 : req.body;
    const response = yield post_service_1.postService.createPostDb(postData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Post created successfully',
        data: response,
    });
}));
const createComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postCommentData = req.body;
    const response = yield post_service_1.postService.createCommentDb(postCommentData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        data: response,
        status: http_status_1.default.OK,
        message: 'Comment created successfully',
    });
}));
const UpDownVote = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, vote, userId } = req.body;
    console.log(postId, vote, ' this is upvote controller');
    const response = yield post_service_1.postService.UpDownVoteDb(postId, vote, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'voted successfully',
        data: response,
    });
}));
const getAllPosts = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchParam = req.query;
    const response = yield post_service_1.postService.getAllPostsDb(searchParam);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Posts fetched successfully',
        data: {
            data: response.data,
            nextId: response.nextId,
        },
    });
}));
const postDelete = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    console.log(postId);
    const response = yield post_service_1.postService.postDeleteDb(postId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'post deleted Successfully',
        data: response,
    });
}));
const postUpdate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = req.body;
    const response = yield post_service_1.postService.postUpdateDb(postData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'post updated Successfully',
        data: response,
    });
}));
const postComment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = req.body;
    switch (action) {
        case 'delete':
            const { commentId } = req.body;
            const response = yield post_service_1.postService.PostCommentUpdate(action, commentId);
            (0, sendResponse_1.sendResponse)(res, {
                success: true,
                status: http_status_1.default.OK,
                message: 'comment deleted Successfully',
                data: response,
            });
            break;
        case 'edit':
            const { commentId: editCommentId, comment, post, updatedComment, } = req.body;
            const responseComment = yield post_service_1.postService.PostCommentUpdate(action, editCommentId, updatedComment);
            (0, sendResponse_1.sendResponse)(res, {
                success: true,
                status: http_status_1.default.OK,
                message: 'comment updated Successfully',
                data: responseComment,
            });
            break;
    }
}));
const getLoggedInUserPost = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    console.log(req.params);
    const response = yield post_service_1.postService.getLoggedInUserPosts(userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'user posts fetched successfully',
        data: response,
    });
}));
const postChart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield post_service_1.postService.postChartDb();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'chart data fetched successfully',
        data: response,
    });
}));
const getSinglePostController = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const response = yield post_service_1.postService.getSinglePostDb(postId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'post fetched successfully',
        data: response,
    });
}));
exports.postController = {
    createPost,
    createComment,
    UpDownVote,
    getAllPosts,
    postDelete,
    postUpdate,
    postComment,
    getLoggedInUserPost,
    postChart,
    getSinglePostController,
};
