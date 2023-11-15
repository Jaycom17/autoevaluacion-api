import { Router } from "express";

import { userLogin, userLogOut } from "../controllers/evaluationUser.controller";

import { auth } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/user/login", userLogin);

userRouter.get("/user/profile", auth, (req, res) => {
    res.send(req.body.user);
});

userRouter.post("/user/logout", auth, userLogOut);

export default userRouter;