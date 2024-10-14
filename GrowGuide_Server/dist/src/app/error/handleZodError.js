"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    return {
        success: false,
        statusCode: 200,
        sources: err.issues.map((error) => {
            return {
                path: error.path[0],
                message: error.message,
            };
        }),
        message: 'Zod Validation Error',
    };
};
exports.default = handleZodError;
