"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const postfromData_1 = __importDefault(require("./postfromData"));
const ToCloudinary_1 = require("../../utilities/ToCloudinary");
const parsePostFormData_1 = __importDefault(require("../../middlewares/parsePostFormData"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('/create-post', ToCloudinary_1.upload.array('file'), postfromData_1.default, post_controller_1.postController.createPost);
router.put('/create-comment', post_controller_1.postController.createComment);
router.patch('/vote', post_controller_1.postController.UpDownVote);
router.get('/posts', post_controller_1.postController.getAllPosts);
router.delete('/post-delete', (0, auth_1.default)(['user', 'admin']), post_controller_1.postController.postDelete);
router.put('/comments', post_controller_1.postController.postComment);
router.patch('/post-update', ToCloudinary_1.upload.array('file'), parsePostFormData_1.default, post_controller_1.postController.postUpdate);
router.post('/');
// ! get logged in user posts
router.get('/get-user-posts', post_controller_1.postController.getLoggedInUserPost);
router.get('/posts-charts', post_controller_1.postController.postChart);
router.get('/posts/:postId', post_controller_1.postController.getSinglePostController);
exports.postRoute = router;
