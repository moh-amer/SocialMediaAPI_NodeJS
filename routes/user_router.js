import express from "express";
import { validateLogin, validateRegister } from "../middlewares/validators.js";
import { authenticate, authorize } from "../middlewares/authentication.js";
import fileUploader from "express-fileupload";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.use(
  fileUploader({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

userRouter.post("/register", validateRegister, userController.registerUser);

userRouter.get("/profile", authenticate, authorize, async (req, res, next) => {
  res.send(req.user);
});

//Login
userRouter.post("/login", validateLogin, userController.loginUser);

// update User
userRouter.patch("/update", authenticate, authorize, userController.updateUser);

//Delete User
userRouter.delete(
  "/delete",
  authenticate,
  authorize,
  userController.deleteUser
);

export default userRouter;
