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
exports.LoginService = exports.RegisterService = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Admin_model_1 = require("../../models/Admin.model");
const encrypt_1 = require("../../helpers/encrypt");
const RegisterService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield Admin_model_1.Admin.findOne({
            where: {
                email: data.email
            }
        });
        if (account) {
            return {
                code: "error",
                message: "Your email is existed!"
            };
        }
        const hashPassword = (0, encrypt_1.encrypt)(data.password);
        yield Admin_model_1.Admin.create({
            name: data.name,
            email: data.email,
            password: hashPassword
        });
        return {
            code: "success",
            message: "Register successfully!"
        };
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
        return {
            code: "error",
            message: "Bad request"
        };
    }
});
exports.RegisterService = RegisterService;
const LoginService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield Admin_model_1.Admin.findOne({
            where: {
                email: data.email
            }
        });
        if (!account) {
            return {
                status: 404,
                code: "error",
                message: "Email or password incorrect!"
            };
        }
        const password = (0, encrypt_1.compare)(data.password, account.dataValues.password);
        if (!password) {
            return {
                status: 404,
                code: "error",
                message: "Email or password incorrect!"
            };
        }
        return {
            status: 200,
            code: "success",
            message: "Login successfully!",
            data: {
                id: account.dataValues.id,
                name: account.dataValues.name,
            }
        };
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
        return {
            status: 400,
            code: "error",
            message: "Bad request!"
        };
    }
});
exports.LoginService = LoginService;
