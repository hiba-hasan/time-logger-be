import { Router } from "express";
import {
  getCurrentUser,
  login,
  register,
} from "../controllers/users.controllers.js";
import { userAuth } from "../middlewares/auth.middlewares.js";
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/myDetails", userAuth, getCurrentUser);

export default userRouter;
