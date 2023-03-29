import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  status: {
    type: String,
    required: true,
    enum: ["todo", "in-progress", "done"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = model("Todo", TodoSchema);

export default Todo;
