import express from "express";
import { PORT } from "./config";

import userRouter from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log("server listening on port: ", PORT);
});
