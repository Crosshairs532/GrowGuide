"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = require("./app/routes/routes");
const globalError_1 = __importDefault(require("./app/middlewares/globalError"));
app.use((0, cors_1.default)({
    origin: ['https://grow-guide-client.vercel.app/'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('GrowGuide Server in running 🚀');
});
app.use('/api/growGuide', routes_1.allRouter);
app.use(globalError_1.default);
process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
    process.exit(1);
});
exports.default = app;
