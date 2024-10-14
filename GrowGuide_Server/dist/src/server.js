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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// write codes to run server
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
let server;
const DBConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(config_1.default.DB_URL);
        yield mongoose_1.default.connect(config_1.default.DB_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`GrowGuide is listening on port ${config_1.default.port} 🚀`);
        });
    }
    catch (error) {
        console.log('something went wrong with the server! ❌', error);
    }
});
DBConnect();
