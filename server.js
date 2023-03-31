import express from "express";
import userRouter from "./routes/user_router.js";
import "express-async-errors";
import { config } from "dotenv";
import { mongoose } from "./db/db.js";
import postRouter from "./routes/post_router.js";
import commentRouter from "./routes/comment_router.js";
import reviewRouter from "./routes/review_router.js";

config();
const app = express();
const PORT = process.env.PORT;

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/review", reviewRouter);

app.listen(9001);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: "error",
    message: err.message || "something went wrong",
    err,
  });
});
