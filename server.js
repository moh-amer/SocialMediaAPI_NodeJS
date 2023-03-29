import express from "express";
import todoRouter from "./routes/todo_router.js";
import userRouter from "./routes/user_router.js";
// require("./db/db");
import "express-async-errors";
import { config } from "dotenv";
import { mongoose } from "./db/db.js";
import postRouter from "./routes/post_router.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use("/todos", todoRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.listen(9001);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: "error",
    message: err.message || "something went wrong",
    err,
  });
});
