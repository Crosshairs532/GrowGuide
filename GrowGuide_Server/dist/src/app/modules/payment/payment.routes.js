"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const paymentController_1 = require("./paymentController");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post('', (0, auth_1.default)(['user, admin']), paymentController_1.paymentController.InitiatePayment);
router.post('/premium', paymentController_1.paymentController.confirmation);
router.get('/payment-history', (0, auth_1.default)(['admin']), paymentController_1.paymentController.payments);
router.get('/payment-history/chart', (0, auth_1.default)(['admin']), paymentController_1.paymentController.paymentsChart);
exports.paymentRoute = router;
