import { Router } from "express";

import { userLogin, userLogOut, registerUser, getProfessors } from "../controllers/evaluationUser.controllers";

import { auth, authCordinator } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/user/login", userLogin);

userRouter.get("/user/profile", auth, (req, res) => {
    res.send(req.body.user);
});

userRouter.post("/user/logout", auth, userLogOut);

userRouter.post("/user/register", authCordinator, registerUser);

userRouter.get("/user/professors", authCordinator, getProfessors);

export default userRouter;