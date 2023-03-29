import User from "../db/models/User.js";
import express from "express";
import { validateLogin, validateRegister } from "../middlewares/validators.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import CustomError from "../helpers/customError.js";
import { JWT_SECRET } from "../config.js";

const jwtSign = promisify(jwt.sign);
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post("/register", validateRegister, async (req, res) => {
  const { username, password, full_name, role } = req.body;
  console.log("hello");
  const createdUser = new User({
    username,
    password, //: hashedPassword,
    full_name,
    role,
  });

  await createdUser.save();

  res.send({ status_code: 1, message: "User Regisered", user: createdUser });
});

userRouter.post("/login", validateLogin, async (req, res, next) => {
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
});

export default userRouter;
