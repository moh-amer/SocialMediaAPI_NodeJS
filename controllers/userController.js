import User from "../db/models/User.js";
import cloudinary from "cloudinary";
import CustomError from "../helpers/customError.js";
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const jwtSign = promisify(jwt.sign);

// Configuration
cloudinary.v2.config({
  cloud_name: "dmjv262pg",
  api_key: "233674425877947",
  api_secret: "W3xZh-g-SQR22aumXvPwjDIOSdo",
});

const registerUser = async (req, res) => {
  const { username, password, full_name, role } = req.body;
  const picture = req.files.image;
  const cloud_pic = await cloudinary.v2.uploader.upload(picture.tempFilePath, {
    public_id: `${Date.now}`,
    resource_type: "auto",
    folder: "images",
  });

  const createdUser = new User({
    username,
    password, //: hashedPassword,
    full_name,
    role,
    picture: cloud_pic.url,
  });

  await createdUser.save();
  res.send({ status_code: 1, message: "User Regisered", user: createdUser });
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const loginUser = await User.findOne({ username });

  if (!loginUser) throw new CustomError("Invalid Input", 400);

  const isMatched = await loginUser.comparePassword(password);
  if (!isMatched) throw new CustomError("Invalid Password", 400);

  const payload = { id: loginUser._id };
  const token = await jwtSign(payload, JWT_SECRET, { expiresIn: "1h" });
  res.json({
    message: "logged in",
    token: token,
    user: loginUser,
  });
};

const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  res.send("User updated scucessfully");
};

const deleteUser = async (req, res, next) => {
  const deleteUser = await User.findByIdAndDelete(req.body.userToDel, {
    new: true,
  });
  res.send("User deleted scucessfully");
};

export { registerUser, loginUser, updateUser, deleteUser };
