import mongoose from "mongoose";
import _ from "lodash";
import * as dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;
const review = new Schema(
  {
    //content: String,
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    date: Date,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        const data = _.pick(ret, ["_id", "rate", "date", "creator", "post"]);
        return data;
      },
    },
  }
);

const Review = mongoose.model("Review", review);
export default Review;
