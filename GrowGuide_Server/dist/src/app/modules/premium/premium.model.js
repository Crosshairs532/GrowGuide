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
exports.premiumModel = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user-management/user.model");
const premiumSchema = new mongoose_1.Schema({
    transactionId: {
        type: String,
    },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' },
    paymentStatus: {
        types: String,
        enum: ['pending', 'paid', 'cancelled'],
    },
    amount: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.premiumModel = (0, mongoose_1.model)('premiumUser', premiumSchema);
premiumSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_model_1.userModel.findByIdAndUpdate({ _id: doc.userId }, {
                $set: { status: 'Premium' },
            });
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
