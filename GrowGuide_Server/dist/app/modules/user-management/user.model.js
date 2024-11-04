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
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name must be required'],
    },
    email: {
        type: String,
        required: [true, 'Email must be required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password must be required'],
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    needsPasswordChange: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'General',
        enum: ['General', 'Premium'],
    },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'users' }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'users' }],
    favourites: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'posts',
        },
    ],
}, {
    timestamps: true,
});
userSchema.statics.findUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email.toString(), '=>');
    const res = yield exports.userModel.findOne({ email });
    console.log(res, 'finduser');
    return res;
});
userSchema.statics.isPassWordMatch = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.userModel.find({ email });
});
exports.userModel = (0, mongoose_1.model)('users', userSchema);
