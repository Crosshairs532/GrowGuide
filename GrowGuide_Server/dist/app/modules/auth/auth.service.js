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
exports.authService = void 0;
const config_1 = __importDefault(require("../../../config"));
const sendEmail_1 = __importDefault(require("../../utilities/sendEmail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../user-management/user.model");
const AppError_1 = __importDefault(require("../../middlewares/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const registrationDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(userData, 'user Registration Data')
    // * check if any user exists or not
    const isExists = yield user_model_1.userModel.findUser(userData === null || userData === void 0 ? void 0 : userData.email);
    if (isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'user already exists!');
    }
    const newUserData = Object.assign(Object.assign({}, userData), { needsPasswordChange: false });
    const res = yield user_model_1.userModel.create(newUserData);
    return res;
});
const loginDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    // * check if any user exists or not
    const isExists = yield user_model_1.userModel.findUser(email);
    console.log(userData, isExists);
    const tokenData = Object.assign({}, isExists === null || isExists === void 0 ? void 0 : isExists._doc);
    console.log({ tokenData });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'user does not exists!');
    }
    if (!(password === (tokenData === null || tokenData === void 0 ? void 0 : tokenData.password))) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'password does not match!');
    }
    const token = jsonwebtoken_1.default.sign(tokenData, config_1.default.jwt_secret, {
        expiresIn: '2d',
    });
    return {
        accessToken: token,
    };
});
const changePasswordDb = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.userModel.findOneAndUpdate({ email }, { password }, { new: true });
    return res;
});
const forgetPasswordDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.userModel.findUser(email);
    console.log(isExist);
    if (!isExist) {
        throw new Error('This User Does not Have any account!');
    }
    const tokenData = {
        name: isExist.name,
        email: isExist.email,
    };
    const accessToken = jsonwebtoken_1.default.sign(tokenData, config_1.default.jwt_secret, {
        expiresIn: '10000',
    });
    console.log(accessToken);
    const link = `${config_1.default.frontend_url}password-reset?email=${email}&accessToken=${accessToken}`;
    const res = yield (0, sendEmail_1.default)(email, 'Reset password', link, isExist === null || isExist === void 0 ? void 0 : isExist.name);
    console.log(res, 'send mail');
    return res;
});
const resetPasswordDb = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield user_model_1.userModel.findOneAndUpdate({ email }, { password }, { new: true });
    return res;
});
exports.authService = {
    registrationDb,
    loginDb,
    changePasswordDb,
    forgetPasswordDb,
    resetPasswordDb,
};
