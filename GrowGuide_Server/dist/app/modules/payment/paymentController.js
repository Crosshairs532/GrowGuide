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
exports.paymentController = void 0;
const mongodb_1 = require("mongodb");
const catchAsync_1 = require("../../utilities/catchAsync");
const sendResponse_1 = require("../../utilities/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const payment_service_1 = require("./payment.service");
const premium_model_1 = require("../premium/premium.model");
const verifyPayment_1 = require("../../utilities/verifyPayment");
const path_1 = require("path");
const fs_1 = require("fs");
const InitiatePayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { name, email } = req.body
    const user = req === null || req === void 0 ? void 0 : req.user;
    console.log(user, 'auseeee');
    const response = yield payment_service_1.paymentService.InitializePaymentDb(user);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Payment successfully done!',
        data: response,
    });
}));
const confirmation = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, status, id } = req.query;
    //! search transaction
    const transaction = yield (0, verifyPayment_1.VerifyPayment)(transactionId);
    console.log(transaction, 'search');
    if (transaction && transaction.pay_status === 'Successful') {
        const paymentDetails = {
            transactionId,
            amount: Number(transaction.amount),
            paymentStatus: 'paid',
            userId: new mongodb_1.ObjectId(id),
        };
        console.log({ paymentDetails });
        const result = yield premium_model_1.premiumModel.create(paymentDetails);
        yield result.populate('userId');
    }
    const filepath = (0, path_1.join)(__dirname, '../../../../public/views/index.html');
    let temp = (0, fs_1.readFileSync)(filepath, 'utf-8');
    temp = temp.replace('{{message}}', status);
    res.send('<h1>success</h1>');
}));
const payments = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield payment_service_1.paymentService.paymentsDb();
    console.log(response, 'running');
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Payment successfully done!',
        data: response,
    });
}));
const paymentsChart = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield payment_service_1.paymentService.paymentsChartDb();
    console.log(response, 'running');
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        status: http_status_1.default.OK,
        message: 'Payment successfully done!',
        data: response,
    });
}));
exports.paymentController = {
    InitiatePayment,
    confirmation,
    payments,
    paymentsChart,
};
