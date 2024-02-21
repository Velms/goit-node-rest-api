import { isFileEmpty } from "#helpers/utils.js";
import { uploadMiddleware } from "#middlewares/upload-file.middleware.js";
import express from "express";
import { ROUTES } from "#helpers/routes.js";
import {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
  uploadAvatar,
} from "#controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post(ROUTES.USERS.REGISTER, createUser);
usersRouter.post(ROUTES.USERS.LOGIN, loginUser);
usersRouter.get(ROUTES.USERS.CURRENT, currentUser);
usersRouter.post(ROUTES.USERS.LOGOUT, logoutUser);
usersRouter.patch(
  ROUTES.USERS.AVATARS,
  uploadMiddleware.single("avatar"),
  isFileEmpty,
  uploadAvatar,
);

export { usersRouter };
