import Comment from "../db/models/comment.js";

const getCommentByID = async (req, res, next) => {
  // const postID = req.params.post_id;
  const commentID = req.params.comment_id;
  const comment = await Comment.findOne({ _id: commentID });
  res.send(comment);
};

const deleteComment = async (req, res, next) => {
  const commentID = req.params.comment_id;
  const comment = await Comment.deleteOne({ _id: commentID });
  res.status(200).json({
    statusCode: 200,
    message: "Comment Deleted Successfully",
    data: comment,
  });
};

const updateComment = async (req, res, next) => {
  const commentID = req.params.comment_id;
  const { content } = req.body;
  const comment = await Comment.updateOne(
    { _id: commentID },
    {
      content,
      data: new Date(),
    }
  );
};

export { getCommentByID, deleteComment, updateComment };
