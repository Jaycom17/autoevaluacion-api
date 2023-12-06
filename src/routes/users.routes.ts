import { Router } from "express";

import { userLogin, userLogOut, registerUser, getProfessors, getCordinator } from "../controllers/evaluationUser.controllers";

import { auth, authCordinator, authRector } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/user/login", userLogin);

userRouter.get("/user/profile", auth, (req, res) => {
    res.send(req.body.user);
});

userRouter.post("/user/logout", auth, userLogOut);

userRouter.post("/user/register", authCordinator, registerUser);

userRouter.get("/user/professors", authCordinator, getProfessors);

userRouter.get("/user/cordinator", authRector, getCordinator);

export default userRouter;