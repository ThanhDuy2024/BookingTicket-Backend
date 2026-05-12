"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.encrypt = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const encrypt = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(password, salt);
    return hash;
};
exports.encrypt = encrypt;
const compare = (password, passwordDB) => {
    const checkPassword = bcryptjs_1.default.compareSync(password, passwordDB);
    return checkPassword; //tru or false
};
exports.compare = compare;
