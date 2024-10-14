"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const configFiles = {
    DB_URL: process.env.DB_URI,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    sender_email: process.env.SENDER_EMAIL,
    sender_password: process.env.SENDER_PASSWORD,
    base_url: process.env.BASE_URL,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    payment_url: process.env.PAYMENT_URL,
    search_transaction: process.env.SEARCH_TRANSACTION,
    frontend_url: process.env.FRONTEND_URL,
};
exports.default = configFiles;
