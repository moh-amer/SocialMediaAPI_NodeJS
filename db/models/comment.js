import mongoose from "mongoose";
import _ from "lodash";
import * as dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;
const comment = new Schema(
  {
    content: String,
    date: Date,
    creator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const data = _.pick(ret, ["_id", "content", "post"]);
        return data;
      },
    },
  }
);

const Comment = mongoose.model("Comment", comment);
export default Comment;
