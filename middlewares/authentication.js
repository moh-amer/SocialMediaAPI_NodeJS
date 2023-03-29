import User from "../db/models/User.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import CustomError from "../helpers/customError.js";
import "express-async-errors";
import { JWT_SECRET } from "../config.js";

const jwtVerify = promisify(jwt.verify);

const authurityRules  ={
  "user":{
    "post":["post", "patch", "delete"],
    "user":["delete"],
    "review":["delete"],
    "comment":["delete"]
  },
  "creator": {
    "post":["delete"],
    "user":["delete"],
    "review":["post", "patch", "delete"],
    "comment":["post", "patch", "delete"]
  },
  "admin":{
    "post":[],
    "user":[],
    "review":[],
    "comment":[]
  },
}

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new CustomError("Un-Authorized", 401);

  const { id } = await jwtVerify(token, JWT_SECRET);
  const user = await User.findById(id);

  if (!user) throw new CustomError("User Not Found", 401);

  req.user = user;
  next();
};

const authorize = async (req , res , next)=>
{
  console.log("hi")
  const userauth = req.user;
  const role = userauth.role ;
  const model=req.originalUrl.split("/")[1];
  //const op =req.originalUrl.split("/")[2];
  const op = req.method.toLowerCase();
  console.log(role,model,op)
  if (authurityRules[role][model].includes(op))
    throw new CustomError(role+" not authorized to "+op, 400);
  next();
}


export {authenticate,authorize};
