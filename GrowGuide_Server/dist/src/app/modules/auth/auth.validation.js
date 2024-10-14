"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const RegistrationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email({ message: 'Invalid email address' }),
    image: zod_1.z.string(),
    password: zod_1.z.string({
        required_error: 'Password is Required',
    }),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
    })
        .email({ message: 'Invalid email address' }),
    password: zod_1.z.string({
        required_error: 'Password is Required',
    }),
});
const changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string({
        required_error: 'Old password is required',
    }),
    newPassword: zod_1.z.string({
        required_error: 'Old password is required',
    }),
});
const resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string({
        required_error: 'This  Field is required',
    }),
});
exports.authValidation = {
    RegistrationSchema,
    loginSchema,
    changePasswordSchema,
    resetPasswordSchema,
};
