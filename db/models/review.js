import mongoose from "mongoose";
import _ from "lodash";
import * as dotenv from "dotenv";
dotenv.config();

const Schema = mongoose.Schema;
const review = new Schema({
  //content: String,
  rate: {
    type: Number,
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
    unique: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Review = mongoose.model("Review", review);
export default Review;
