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
exports.userService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongodb_1 = require("mongodb");
const user_model_1 = require("./user.model");
const post_model_1 = require("../post/post.model");
const config_1 = __importDefault(require("../../../config"));
const updateProfileDb = (updateData, email, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(updateData);
    const isExists = yield user_model_1.userModel.findUser(email);
    console.log(userId, 'looking');
    if (!isExists) {
        throw new Error('user does not exists!');
    }
    try {
        const updated = yield user_model_1.userModel.findOneAndUpdate({ _id: userId }, updateData, {
            new: true,
        });
        // !make new Token
        console.log({ updateData });
        if (updated) {
            const tokenData = Object.assign({}, updated.toObject());
            const token = jsonwebtoken_1.default.sign(tokenData, config_1.default.jwt_secret, {
                expiresIn: '2d',
            });
            return Object.assign(Object.assign({}, updated.toObject()), { accessToken: token });
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const followUserDb = (followUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { myId, followedId } = followUser;
    // ! this is the user who is following
    const CurrentUserFollowing = yield user_model_1.userModel
        .findOneAndUpdate({
        _id: myId,
    }, {
        $addToSet: {
            following: { $each: [followedId] },
        },
    }, {
        new: true,
    })
        .populate('following');
    // ! this is the user who is being followed
    const CurrentFollowingFollower = yield user_model_1.userModel
        .findByIdAndUpdate({
        _id: new mongodb_1.ObjectId(followedId),
    }, {
        $addToSet: {
            followers: { $each: [myId] },
        },
    }, {
        new: true,
    })
        .populate('followers');
    // console.log(CurrentUserFollowing, CurrentFollowingFollower)
    return { CurrentUserFollowing, CurrentFollowingFollower };
});
const unFollowUserDb = (userUnFollowInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { myId, unfollowId } = userUnFollowInfo;
    // console.log(myId, 'what is this ')
    // ! first delete from my list.
    const userUnfollowed = yield user_model_1.userModel.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(myId) }, {
        $pull: {
            following: unfollowId,
        },
    });
    // ! then delete from the other user's list.
    const res = yield user_model_1.userModel.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(unfollowId) }, {
        $pull: {
            followers: myId,
        },
    });
    return { userUnfollowed, res };
});
const addToFavDb = (email, postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.userModel
        .findOneAndUpdate({
        email,
    }, {
        $addToSet: {
            favourites: { $each: [postId] },
        },
    }, {
        new: true,
    })
        .populate({
        path: 'favourites',
    });
    const PostRes = yield post_model_1.postModel.findOneAndUpdate({
        _id: postId,
    }, {
        $addToSet: {
            favourite: { $each: [userId] },
        },
    }, {
        new: true,
    });
    return res;
});
const removeFavDb = (email, postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.userModel
        .findOneAndUpdate({
        email,
    }, {
        $pull: {
            favourites: { $in: [postId] },
        },
    }, {
        new: true,
    })
        .populate({
        path: 'favourites',
    });
    const PostRes = yield post_model_1.postModel.findOneAndUpdate({
        _id: postId,
    }, {
        $pull: {
            favourite: { $in: [userId] },
        },
    }, {
        new: true,
    });
    return res;
});
const getSingleUserDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(id, 'check id')
    const res = yield user_model_1.userModel
        .findById(id)
        .populate('following')
        .populate('followers')
        .populate('favourites');
    // console.log(res, 'check user')
    return res;
});
const adminUserDeleteDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.userModel.findByIdAndDelete(id);
    return res;
});
exports.userService = {
    updateProfileDb,
    followUserDb,
    unFollowUserDb,
    addToFavDb,
    getSingleUserDb,
    adminUserDeleteDb,
    removeFavDb,
};
