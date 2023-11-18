"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const labors_routes_1 = __importDefault(require("./routes/labors.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/api', users_routes_1.default);
app.use('/api', labors_routes_1.default);
app.listen(config_1.PORT, () => {
    console.log("server listening on port: ", config_1.PORT);
});
