import { config } from "dotenv";
import CustomError from "./helpers/customError.js";
import "express-async-errors";

config();

const requiredEnvs = ["JWT_SECRET", "MONGO_URI"];
let requiredEnvsNotIncluded = requiredEnvs.filter((env) => !process.env[env]);

if (requiredEnvsNotIncluded.length)
  throw new CustomError("Missing Important Variables", 500);

const SALT_ROUNDS = process.env.SALT_ROUNDS || 14;
const PORT = process.env.PORT || 9001;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export { SALT_ROUNDS, PORT, MONGO_URI, JWT_SECRET };
