import express from "express";
import Post from "../db/models/post.js";
import Comment from "../db/models/comment.js";
import { authenticate, authorize } from "../middlewares/authentication.js";
import Review from "../db/models/review.js";
import * as postController from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.use(express.json());

//create new post
postRouter.post("/", authenticate, authorize, postController.createPost);

// update post
postRouter.patch("/:id", authenticate, authorize, postController.updatePost);

// delete post
postRouter.delete(
  "/post_id",
  authenticate,
  authorize,
  postController.deletePost
);

//get all posts
postRouter.get("/", authenticate, authorize, postController.getAllPosts);

//get post by id
postRouter.get(
  "/:post_id",
  authenticate,
  authorize,
  postController.getPostByID
);

//Dealing with comments

// Add Comment to post
postRouter.post(
  "/:post_id/comment",
  authenticate,
  authorize,
  postController.addCommentToPost
);

//Get all Comments of specific post
postRouter.get(
  "/:post_id/comment",
  authenticate,
  authorize,
  postController.getAllPostComments
);

// Add Review to post
postRouter.post(
  "/:post_id/review",
  authenticate,
  authorize,
  postController.addReviewToPost
);

//Get all Reviews of specific post
postRouter.get(
  "/:post_id/review",
  authenticate,
  authorize,
  postController.getAllPostReviews
);

export default postRouter;
