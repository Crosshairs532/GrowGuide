"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRouter = void 0;
const express_1 = require("express");
const pdf_controller_1 = require("./pdf.controller");
const router = (0, express_1.Router)();
router.post('/pdf', pdf_controller_1.pdfController.GeneratePdfController);
exports.pdfRouter = router;
