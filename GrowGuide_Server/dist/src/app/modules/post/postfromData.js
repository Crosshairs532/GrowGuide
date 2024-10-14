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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../../utilities/catchAsync");
const ToCloudinary_1 = require("../../utilities/ToCloudinary");
const user_model_1 = require("../user-management/user.model");
const postFromData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d;
    console.log(req);
    const formData = JSON.parse(req.body.data);
    console.log(formData);
    // !find the user
    const user = yield user_model_1.userModel.findById(formData.user);
    // ! array of images with location on the local file
    const path = (_d = req.files) === null || _d === void 0 ? void 0 : _d.map((file) => file.path);
    let images = [];
    try {
        for (var _e = true, path_1 = __asyncValues(path), path_1_1; path_1_1 = yield path_1.next(), _a = path_1_1.done, !_a; _e = true) {
            _c = path_1_1.value;
            _e = false;
            let element = _c;
            const { secure_url } = (yield (0, ToCloudinary_1.sendImageToCloudinary)(user.name, element));
            images.push(secure_url);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = path_1.return)) yield _b.call(path_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    req.body = Object.assign({ images: images }, formData);
    next();
}));
exports.default = postFromData;
