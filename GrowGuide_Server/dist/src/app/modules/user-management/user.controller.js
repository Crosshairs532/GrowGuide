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
exports.userController = void 0;
const catchAsync_1 = require("../../utilities/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utilities/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const profileUpdate = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserData = req.body;
    const { email: loggedInUserEmail, _id: userId } = req.user;
    // console.log(req.user)
    // console.log(loggedInUserEmail, 'profile update.')
    const response = yield user_service_1.userService.updateProfileDb(updateUserData, loggedInUserEmail, userId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Profile updated successfully',
        data: response,
    });
}));
const FollowUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const followedUserId = req.body; //! ownId, followedId
    const response = yield user_service_1.userService.followUserDb(followedUserId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'User followed successfully',
        data: response,
    });
}));
const unfollowUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userUnFollowInfo = req.body; //! ownId, followedId
    const response = yield user_service_1.userService.unFollowUserDb(userUnFollowInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'User un-followed successfully',
        data: response,
    });
}));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield user_model_1.userModel.find({});
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            status: http_status_1.default.OK,
            message: 'Users fetched successfully',
            data: response,
        });
    }
    catch (err) {
        console.log(err.message);
    }
});
const addToFav = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, postId } = req.body;
    const response = yield user_service_1.userService.addToFavDb(email, postId);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Post added to fav successfully',
        data: response,
    });
}));
const getSingleUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const response = yield user_service_1.userService.getSingleUserDb(email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'User fetched successfully',
        data: response,
    });
}));
exports.userController = {
    profileUpdate,
    FollowUser,
    unfollowUser,
    getAllUsers,
    addToFav,
    getSingleUser,
};
