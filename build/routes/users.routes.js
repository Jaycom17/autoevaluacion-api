"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post("/user/login", users_controllers_1.userLogin);
userRouter.get("/user/profile", auth_middleware_1.auth, (_req, res) => {
    res.send("hola");
});
exports.default = userRouter;
