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
exports.adminLogin = exports.adminRegister = void 0;
const admin_service_1 = require("../../services/admins/admin.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const message = yield (0, admin_service_1.RegisterService)(data);
        if (message.code === "error") {
            return res.status(400).json(message);
        }
        return res.status(200).json(message);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            code: "error",
            message: "Bad Request"
        });
    }
});
exports.adminRegister = adminRegister;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const data = req.body;
        const message = yield (0, admin_service_1.LoginService)(data);
        if (message.code === "success") {
            const token = jsonwebtoken_1.default.sign({
                name: (_a = message.data) === null || _a === void 0 ? void 0 : _a.name,
                id: (_b = message.data) === null || _b === void 0 ? void 0 : _b.id
            }, String(process.env.JWT_PASSWORD));
            res.cookie("adminToken", token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: process.env.PRODUCTION === "false" ? "lax" : "none"
            });
        }
        return res.status(message.status).json({
            code: message.code,
            message: message.message
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            code: "error",
            message: "Bad request!"
        });
    }
});
exports.adminLogin = adminLogin;
