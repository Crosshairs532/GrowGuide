"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const ToCloudinary_1 = require("../../utilities/ToCloudinary");
const parseFromData_1 = __importDefault(require("../../middlewares/parseFromData"));
const validation_1 = require("../../middlewares/validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router.post('/register', ToCloudinary_1.upload.single('file'), parseFromData_1.default, (0, validation_1.validation)(auth_validation_1.authValidation.RegistrationSchema), auth_controller_1.authController.Registration);
router.post('/login', (0, validation_1.validation)(auth_validation_1.authValidation.loginSchema), auth_controller_1.authController.Login);
router.post('/change-password', (0, auth_1.default)(['user', 'admin']), (0, validation_1.validation)(auth_validation_1.authValidation.changePasswordSchema), auth_controller_1.authController.changePassword);
router.post('/reset-password', 
// auth(['user', 'admin']),
(0, validation_1.validation)(auth_validation_1.authValidation.resetPasswordSchema), auth_controller_1.authController.resetPassword);
router.post('/forget-password', 
// validation(authValidation.resetPasswordSchema),
auth_controller_1.authController.forgetPassword);
exports.authRoute = router;
