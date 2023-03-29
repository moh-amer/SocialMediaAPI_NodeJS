import express from "express";
import Todo from "../db/models/Todo.js";
import auth from "../middlewares/authentication.js";

const todoRouter = express.Router();

todoRouter.use(express.json());
todoRouter.post("/", auth, async (req, res, next) => {
  const { title, status } = req.body;
  await Todo.create({
    title,
    status,
    user: req.user._id,
  });
  res.send({ status_code: 1, message: "Inserted" });
});

todoRouter.patch("/:id", auth, async (req, res, next) => {
  const { title, status } = req.body;
  const id = req.params.id;
  await Todo.updateOne(
    { _id: id, user: req.user._id },
    {
      title,
      status,
    }
  );

  res.send({ status_code: 1, message: "Patched" });
});

todoRouter.delete("/:id", auth, async (req, res, next) => {
  const id = req.params.id;
  const deleteResult = await Todo.deleteOne({ _id: id, user: req.user._id });
  // deletedCount;
  res.send({
    status_code: 1,
    message: "deleted Successfuly",
    deletedCount: deleteResult.deletedCount,
  });
});

todoRouter.delete("/", auth, async (req, res, next) => {
  const deleteResult = await Todo.deleteMany({ user: req.user._id });
  res.send({
    status_code: 0,
    message: "deleted Successfuly",
    deletedCount: deleteResult.deletedCount,
  });
});

todoRouter.get("/status/:status?", auth, async (req, res, next) => {
  let { status } = req.params;
  const user = req.user._id;
  if (status) {
    const todos = await Todo.find(
      { status, user },
      { title: 1, status: 1, user: 1 }
    ).populate("user");
    res.send(todos);
  } else {
    let todos = await Todo.find(
      { user: user },
      { title: 1, status: 1, user: 1 }
    ).populate("user");
    res.send(todos);
  }
});

todoRouter.get("/:id", auth, async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id, { title: 1, status: 1 }).populate(
    "user"
  );
  res.send(todo);
});

export default todoRouter;
