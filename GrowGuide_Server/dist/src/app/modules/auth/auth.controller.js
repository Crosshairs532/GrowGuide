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
exports.authController = void 0;
const catchAsync_1 = require("../../utilities/catchAsync");
const sendResponse_1 = require("../../utilities/sendResponse");
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const Registration = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registrationData = req.body;
    const response = yield auth_service_1.authService.registrationDb(registrationData);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Registration successful',
        data: response,
    });
}));
const Login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const response = yield auth_service_1.authService.loginDb(loginData);
    console.log(response);
    // res.cookie('accessToken', response!.accessToken, { maxAge: 20000 })
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Login successful',
        data: response,
    });
}));
const changePassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req === null || req === void 0 ? void 0 : req.user;
    const { oldPassword, newPassword } = req.body;
    if (!(password === oldPassword)) {
        throw new Error('old password Does not match!');
    }
    const response = yield auth_service_1.authService.changePasswordDb(email, newPassword);
    res.clearCookie('accessToken');
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Password changed successfully',
        data: response,
    });
    // !check that logged in user and the given old password matches
}));
const forgetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req === null || req === void 0 ? void 0 : req.body;
    console.log({ email }, 'server');
    const response = yield auth_service_1.authService.forgetPasswordDb(email);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Forget password email sent successfully',
        data: response,
    });
}));
const resetPassword = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { email: verifiedEmail } = req?.user as JwtPayload
    const { email, password } = req.body;
    console.log({ email, password });
    // if (!(verifiedEmail === email)) {
    //   throw new Error('You are not Authorized!')
    // }
    const response = yield auth_service_1.authService.resetPasswordDb(email, password);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: 200,
        message: 'Password reset successfully',
        data: response,
    });
}));
exports.authController = {
    Registration,
    Login,
    changePassword,
    forgetPassword,
    resetPassword,
};
