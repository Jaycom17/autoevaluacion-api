"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRector = exports.authCordinator = exports.authProfessor = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            req.body.user = user;
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
const authProfessor = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            if (user.usu_rol !== "docente") {
                return res.status(401).json({ message: "User is not a professor" });
            }
            if (user.usu_rol !== config_1.ROLES.PROFESSOR) {
                return res.status(401).json({ message: "User is not a professor" });
            }
            req.body.user = user;
            next();
            return;
        });
    }
    catch (error) {
        return res.status(500).json({ message: "there was an error" });
    }
    return;
};
exports.authProfessor = authProfessor;
const authCordinator = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            if (user.usu_rol !== config_1.ROLES.CORDINATOR && user.usu_rol !== config_1.ROLES.RECTOR) {
                return res.status(401).json({ message: "User is not a coordinator or dean" });
            }
            req.body.user = user;
            next();
            return;
        });
    }
    catch (error) {
        return res.status(500).json({ message: "there was an error" });
    }
    return;
};
exports.authCordinator = authCordinator;
const authRector = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });
        jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            if (user.usu_rol !== config_1.ROLES.RECTOR) {
                return res.status(401).json({ message: "User is not a rector" });
            }
            req.body.user = user;
            next();
            return;
        });
    }
    catch (error) {
        return res.status(500).json({ message: "there was an error" });
    }
    return;
};
exports.authRector = authRector;
