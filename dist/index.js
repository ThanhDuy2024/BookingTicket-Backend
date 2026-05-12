"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./routes/admins/index.route"));
const database_config_1 = require("./configs/database.config");
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, database_config_1.connectDatabase)();
app.use((0, cors_1.default)({
    origin: [
        String(process.env.FE_HOST)
    ],
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/admin", index_route_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
