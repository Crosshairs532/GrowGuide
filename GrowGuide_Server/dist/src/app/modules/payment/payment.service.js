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
exports.paymentService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../../config"));
const GenerateTranId_1 = require("../../utilities/GenerateTranId");
const InitializePaymentDb = (name, email, user) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionID = (0, GenerateTranId_1.generate_transaction_id)(name);
    if (transactionID) {
        const res = yield axios_1.default.post(config_1.default.payment_url, {
            store_id: 'aamarpaytest',
            tran_id: transactionID,
            success_url: `http://localhost:2000/api/GrowGuide/payment/premium?id=${user._id}&transactionId=${transactionID}&status=success`,
            fail_url: `http://localhost:2000/api/GrowGuide/payment/premium?transactionId=${transactionID}&status=Failed`,
            cancel_url: 'http://localhost:3000/',
            amount: '100.00',
            currency: 'BDT',
            signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
            desc: 'Merchant Registration Payment',
            cus_name: name,
            cus_email: email,
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1206',
            cus_country: 'Bangladesh',
            cus_phone: '+8801704',
            type: 'json',
        });
        return res.data;
    }
});
exports.paymentService = {
    InitializePaymentDb,
};
