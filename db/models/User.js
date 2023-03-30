import mongoose from "mongoose";
import bcrypt from "bcrypt";
import _ from "lodash";
import { SALT_ROUNDS } from "../../config.js";

const UserSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    picture: String,
    role: {
      type: String,
      required: true,
      enum: ["admin", "creator", "user"],
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        // delete ret.password;
        // delete ret.__v;
        const data = _.pick(ret, ["_id", "username", "full_name","picture"]);
        return data;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  const userDocument = this;
  if (userDocument.isModified("password")) {
    const hashedPassword = await bcrypt.hash(
      userDocument.password,
      parseInt(SALT_ROUNDS)
    );
    userDocument.password = hashedPassword;
  }
  next();
});

UserSchema.methods.comparePassword = function (password) {
  const userDocument = this;
  return bcrypt.compare(password, userDocument.password);
};
const User = mongoose.model("User", UserSchema);

export default User;
