"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const AppError_1 = __importDefault(require("./AppError"));
const http_status_1 = __importDefault(require("http-status"));
const globalError = (err, req, res, next) => {
    console.log(err, 'GlobalError');
    let statusCode = err.status || 500 || http_status_1.default.INTERNAL_SERVER_ERROR;
    let errorMessage = err.message || 'something went wrong!';
    let sources = [
        {
            path: '',
            message: 'Something Went Wrong',
        },
    ];
    //! zod Error
    if (err instanceof zod_1.ZodError) {
        const ZodError = (0, handleZodError_1.default)(err);
        statusCode = ZodError.statusCode;
        errorMessage = ZodError.message;
        sources = ZodError.sources;
    }
    else if (err instanceof Error) {
        console.log('Error');
        errorMessage = err === null || err === void 0 ? void 0 : err.message;
        sources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.status;
        errorMessage = err.message;
        sources = [
            {
                path: '',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message: errorMessage,
        errorSources: sources,
    });
    return;
};
exports.default = globalError;
