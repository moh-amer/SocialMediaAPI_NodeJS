import mongoose from "mongoose";
import _ from "lodash";
import * as dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;
const post = new Schema(
  {
    content: String,
    date: Date,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const data = _.pick(ret, ["_id", "content", "date", "creator"]);
        return data;
      },
    },
  }
);

const Post = mongoose.model("Post", post);
export default Post;
