import express from "express";
import Post from "../db/models/post.js";
import {authenticate,authorize} from "../middlewares/authentication.js";

const postRouter = express.Router();

postRouter.use(express.json());

postRouter.post("/", authenticate,authorize, async (req, res, next) => {
  const { content } = req.body;
  await Post.create({
    content,
    date: new Date(),
    creator: req.user._id,
  });
  res.send("Inserted successfully");
});

postRouter.patch("/:id", authenticate,authorize, async (req, res, next) => {
  const { content } = req.body;
  const id = req.params.id;

  await Post.updateOne(
    { _id: id, creator: req.user._id },
    {
      content,
      date: new Date(),
    }
  );

  req.send("Updated");
});

postRouter.delete("/:id", authenticate,authorize, async (req, res, next) => {
  const id = req.params.id;
  const user_id = req.user._id;
  const deletedPost = await Post.deleteOne({ _id: id, creator: user_id });
  req.send("Deleted");
});

postRouter.get("/", authenticate,authorize, async (req, res, next) => {
  const user_id = req.user._id;
  const posts = await Post.find({ creator: user_id }).populate("creator");
  res.send(posts);
});

postRouter.get("/:id", authenticate,authorize, async (req, res, next) => {
  const id = req.params.id;
  const users = await Post.find({ _id: id }).populate("creator");
  res.send(users);
});

export default postRouter;
