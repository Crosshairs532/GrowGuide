"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_transaction_id = void 0;
const generate_transaction_id = (name) => {
    const timestamp = Date.now();
    const random_number = Math.floor(Math.random() * 100000);
    return `TXN-${name.substring(0, 2)}-${timestamp}-${random_number}`;
};
exports.generate_transaction_id = generate_transaction_id;
