import mongoose from "mongoose";
import { MONGO_URI } from "../config.js";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

export { mongoose };
