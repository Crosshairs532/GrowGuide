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
exports.VerifyPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
const VerifyPayment = (trnId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(trnId, 'trnId');
    const response = yield axios_1.default.get(config_1.default.search_transaction, {
        params: {
            request_id: trnId,
            store_id: config_1.default.store_id,
            signature_key: config_1.default.signature_key,
            type: 'json',
        },
    });
    return response.data;
});
exports.VerifyPayment = VerifyPayment;
