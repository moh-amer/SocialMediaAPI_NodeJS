import User from "../db/models/User.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import CustomError from "../helpers/customError.js";
import "express-async-errors";
import { JWT_SECRET } from "../config.js";

const jwtVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new CustomError("Un-Authorized", 401);

  const { id } = await jwtVerify(token, JWT_SECRET);
  const user = await User.findById(id);

  if (!user) throw new CustomError("User Not Found", 401);

  req.user = user;
  next();
};

export default auth;
