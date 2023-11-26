"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluationUser_controllers_1 = require("../controllers/evaluationUser.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post("/user/login", evaluationUser_controllers_1.userLogin);
userRouter.get("/user/profile", auth_middleware_1.auth, (req, res) => {
    res.send(req.body.user);
});
userRouter.post("/user/logout", auth_middleware_1.auth, evaluationUser_controllers_1.userLogOut);
userRouter.post("/user/register", auth_middleware_1.authCordinator, evaluationUser_controllers_1.registerUser);
userRouter.get("/user/professors", auth_middleware_1.authCordinator, evaluationUser_controllers_1.getProfessors);
exports.default = userRouter;
