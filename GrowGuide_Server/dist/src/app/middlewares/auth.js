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
const catchAsync_1 = require("../utilities/catchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../modules/user-management/user.model");
// * it is used when i need to verify the user.
const auth = () => {
    return (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        console.log(token, 'access-Token');
        if (!token) {
            throw new Error('You are not Authorized!');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const { email, password } = decoded;
        console.log({ email });
        //! check of the decoded user really exists?
        const isExists = yield user_model_1.userModel.findUser(email);
        console.log(isExists, '<<=');
        if (!isExists) {
            throw new Error('This User does not exists!');
        }
        if (!(email === isExists.email)) {
            throw new Error('This User does not authorized');
        }
        req.user = isExists;
        next();
    }));
};
exports.default = auth;
