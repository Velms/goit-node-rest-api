import express from "express";
import { ROUTES } from "#helpers/routes.js";
import {
  createUser,
  loginUser,
  logoutUser,
  currentUser,
} from "#controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.post(ROUTES.USERS.REGISTER, createUser);
usersRouter.post(ROUTES.USERS.LOGIN, loginUser);
usersRouter.get(ROUTES.USERS.CURRENT, currentUser);
usersRouter.post(ROUTES.USERS.LOGOUT, logoutUser);

export { usersRouter };
