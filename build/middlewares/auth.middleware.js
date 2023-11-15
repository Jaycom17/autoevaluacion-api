"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(req.cookies);
        if (!token)
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            (req.body = req.body), user;
            console.log(req.body);
            next();
            return;
        });
    }
    catch (error) {
        return res.status(500).json({ message: "there was an error" });
    }
    return;
};
exports.auth = auth;
