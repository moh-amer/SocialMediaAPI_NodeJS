import Post from "../db/models/post.js";
import Review from "../db/models/review.js";

const createPost = async (req, res, next) => {
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
};

const updatePost = async (req, res, next) => {
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
};

const deletePost = async (req, res, next) => {
  const id = req.params.post_id;
  const user_id = req.user._id;
  const deletedPost = await Post.deleteOne({ _id: id, creator: user_id });
  res.status("Deleted").json({
    statusCode: 200,
    message: "Post Deleted Successfully",
  });
};

const getAllPosts = async (req, res, next) => {
  const user_id = req.user._id;
  const posts = await Post.find({ creator: user_id }).populate("creator");
  res.send(posts);
};

const getPostByID = async (req, res, next) => {
  const id = req.params.post_id;
  const users = await Post.find({ _id: id }).populate("creator");
  res.send(users);
};

const addCommentToPost = async (req, res, next) => {
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
};

const getAllPostComments = async (req, res, next) => {
  const postID = req.params.post_id;
  const comments = await Comment.find({ post: postID });
  res.send(comments);
};

const addReviewToPost = async (req, res, next) => {
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
};

const getAllPostReviews = async (req, res, next) => {
  const postID = req.params.post_id;
  const reviews = await Review.find({ post: postID });
  res.send(reviews);
};

export {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostByID,
  addCommentToPost,
  getAllPostComments,
  addReviewToPost,
  getAllPostReviews,
};
