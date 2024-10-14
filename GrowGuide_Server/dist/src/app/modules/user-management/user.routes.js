"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const parseFromData_1 = __importDefault(require("../../middlewares/parseFromData"));
const ToCloudinary_1 = require("../../utilities/ToCloudinary");
const router = (0, express_1.Router)();
router.put('/profile-update', ToCloudinary_1.upload.single('file'), parseFromData_1.default, (0, auth_1.default)(), user_controller_1.userController.profileUpdate);
router.post('/follow-user', (0, auth_1.default)(), user_controller_1.userController.FollowUser);
router.post('/unfollow-user', (0, auth_1.default)(), user_controller_1.userController.unfollowUser);
router.get('/users', user_controller_1.userController.getAllUsers);
router.post('/add-to-favourites', user_controller_1.userController.addToFav);
router.get('/user', user_controller_1.userController.getSingleUser);
exports.userRoute = router;
