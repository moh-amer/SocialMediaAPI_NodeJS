import express from "express";
import Post from "../db/models/post.js";
import Comment from "../db/models/comment.js";
import { authenticate, authorize } from "../middlewares/authentication.js";
import Review from "../db/models/review.js";

const postRouter = express.Router();

postRouter.use(express.json());

postRouter.post("/", authenticate, authorize, async (req, res, next) => {
  const { content } = req.body;
  const createdPost = await Post.create({
    content,
    date: new Date(),
    creator: req.user._id,
  });
  res.status("201").json({
    statusCode: 201,
    message: "Post Created Successfuly",
    data: createdPost,
  });
  // res.send("Inserted successfully");
});

postRouter.patch("/:id", authenticate, authorize, async (req, res, next) => {
  const { content } = req.body;
  const id = req.params.id;

  await Post.updateOne(
    { _id: id, creator: req.user._id },
    {
      content,
      date: new Date(),
    }
  );

  res.status("200").json({
    statusCode: 200,
    message: "Post Updated Successfully",
  });
});

postRouter.delete(
  "/post_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    const id = req.params.post_id;
    const user_id = req.user._id;
    const deletedPost = await Post.deleteOne({ _id: id, creator: user_id });
    res.status("Deleted").json({
      statusCode: 200,
      message: "Post Deleted Successfully",
    });
  }
);

postRouter.get("/", authenticate, authorize, async (req, res, next) => {
  const user_id = req.user._id;
  const posts = await Post.find({ creator: user_id }).populate("creator");
  res.send(posts);
});

postRouter.get("/:post_id", authenticate, authorize, async (req, res, next) => {
  const id = req.params.post_id;
  const users = await Post.find({ _id: id }).populate("creator");
  res.send(users);
});

//Dealing with comments

// Add Comment
postRouter.post(
  "/:post_id/comment",
  authenticate,
  authorize,
  async (req, res, next) => {
    const post = req.params.post_id;
    const creator = req.user._id;
    const { content } = req.body;
    await Comment.create({
      content,
      date: new Date(),
      creator,
      post,
    });

    res.status("201").json({
      statusCode: 201,
      message: "Comment Inserted Successfully",
    });
  }
);

//Get all Comments of specific post
postRouter.get(
  "/:post_id/comment",
  authenticate,
  authorize,
  async (req, res, next) => {
    const postID = req.params.post_id;
    const comments = await Comment.find({ post: postID });
    res.send(comments);
  }
);

//get specific comment for a specific post
postRouter.get(
  "/comment/:comment_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    // const postID = req.params.post_id;
    const commentID = req.params.comment_id;
    const comment = await Comment.findOne({ _id: commentID });
    res.send(comment);
  }
);

postRouter.delete(
  "/comment/:comment_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    const commentID = req.params.comment_id;
    const comment = await Comment.deleteOne({ _id: commentID });
    res.status(200).json({
      statusCode: 200,
      message: "Comment Deleted Successfully",
      data: comment,
    });
  }
);

postRouter.patch(
  "/comment/:comment_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    const commentID = req.params.comment_id;
    const { content } = req.body;
    const comment = await Comment.updateOne(
      { _id: commentID },
      {
        content,
        data: new Date(),
      }
    );

    res.status(200).json({
      statusCode: 200,
      message: "Comment Updated Successfully",
      data: comment,
    });
  }
);

//End Dealing with comments

// Start Dealing with reviews

// Add Review
postRouter.post(
  "/:post_id/review",
  authenticate,
  authorize,
  async (req, res, next) => {
    const post = req.params.post_id;
    const creator = req.user._id;
    const { rate } = req.body;
    await Review.create({
      rate,
      date: new Date(),
      creator,
      post,
    });

    res.status("201").json({
      statusCode: 201,
      message: "Review Added Successfully",
    });
  }
);

//Get all Comments of specific post
postRouter.get(
  "/:post_id/review",
  authenticate,
  authorize,
  async (req, res, next) => {
    const postID = req.params.post_id;
    const reviews = await Review.find({ post: postID });
    res.send(reviews);
  }
);

//get specific comment for a specific post
postRouter.get(
  "/review/:review_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    const reviewID = req.params.review_id;
    const review = await Review.findOne({ _id: reviewID });
    res.send(review);
  }
);

postRouter.delete(
  "/review/:review_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    const reviewID = req.params.review_id;
    const deleteResult = await Review.deleteOne({ _id: reviewID });
    res.status(200).json({
      statusCode: 200,
      message: "Review Deleted Successfully",
      data: deleteResult,
    });
  }
);

postRouter.patch(
  "/review/:review_id",
  authenticate,
  authorize,
  async (req, res, next) => {
    const reviewID = req.params.review_id;
    const { rate } = req.body;
    const review = await Review.updateOne(
      { _id: reviewID },
      {
        rate,
        data: new Date(),
      }
    );

    res.status(200).json({
      statusCode: 200,
      message: "Review Updated Successfully",
      data: review,
    });
  }
);

// End Dealing with reviews

export default postRouter;
