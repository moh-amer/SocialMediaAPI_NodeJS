import Joi from "joi";
import CustomError from "../helpers/customError.js";
import "express-async-errors";

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  role: Joi.string().valid("creator", "admin", "user"),
  full_name: Joi.string().min(5).max(200).required(),
});

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) throw new CustomError("Un-Authorized", 400, error);

  next();
};

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) throw new CustomError("Error in Registeration", 400);

  next();
};

export { validateLogin, validateRegister};
