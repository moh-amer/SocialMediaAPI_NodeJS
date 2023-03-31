import express from "express";
import Comment from "../db/models/comment.js";
import { authenticate, authorize } from "../middlewares/authentication.js";
import * as commentController from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.use(express.json());

//get specific comment for a specific post
commentRouter.get(
  "/:comment_id",
  authenticate,
  authorize,
  commentController.getCommentByID
);

commentRouter.delete(
  "/:comment_id",
  authenticate,
  authorize,
  commentController.deleteComment
);

commentRouter.patch(
  "/:comment_id",
  authenticate,
  authorize,
  commentController.updateComment
);

export default commentRouter;
