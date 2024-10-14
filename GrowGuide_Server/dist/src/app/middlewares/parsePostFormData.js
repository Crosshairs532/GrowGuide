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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = require("../utilities/catchAsync");
const ToCloudinary_1 = require("../utilities/ToCloudinary");
const parsePostFormData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d;
    const _e = JSON.parse(req.body.data), { images: formImages, post } = _e, other = __rest(_e, ["images", "post"]);
    const pData = JSON.parse(req.body.data);
    console.log(pData);
    // const user = await userModel.findById(post?.user?._id)
    // // ! array of images with location on the local file
    const path = (_d = req === null || req === void 0 ? void 0 : req.files) === null || _d === void 0 ? void 0 : _d.map((file) => file.path);
    let images = [...formImages];
    if (path.length > 0) {
        try {
            for (var _f = true, path_1 = __asyncValues(path), path_1_1; path_1_1 = yield path_1.next(), _a = path_1_1.done, !_a; _f = true) {
                _c = path_1_1.value;
                _f = false;
                let element = _c;
                const { secure_url } = (yield (0, ToCloudinary_1.sendImageToCloudinary)(post === null || post === void 0 ? void 0 : post.user.name, element));
                console.log(secure_url);
                images.push(secure_url);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = path_1.return)) yield _b.call(path_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    const parsedData = Object.assign(Object.assign({ images }, other), { post });
    console.log({ parsedData });
    req.body = parsedData;
    next();
}));
exports.default = parsePostFormData;
