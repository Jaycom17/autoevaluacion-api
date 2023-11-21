import { Router } from "express";

import { userLogin, userLogOut, registerUser } from "../controllers/evaluationUser.controllers";

import { auth } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/user/login", userLogin);

userRouter.get("/user/profile", auth, (req, res) => {
    res.send(req.body.user);
});

userRouter.post("/user/logout", auth, userLogOut);

userRouter.post("/user/register", registerUser);

export default userRouter;