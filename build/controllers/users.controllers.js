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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = void 0;
const user_model_1 = require("../models/user.model");
const UserModel = new user_model_1.User();
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usu_email, usu_contrasena } = req.body;
    const user = yield UserModel.login(usu_email, usu_contrasena);
    if (user.message || user.error) {
        res.status(400).json(user);
        return;
    }
    res.cookie("token", user.token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: false,
        sameSite: "none",
    });
    res.json(user.userData);
    return;
});
exports.userLogin = userLogin;
