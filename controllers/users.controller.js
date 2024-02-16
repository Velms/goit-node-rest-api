import jwt from "jsonwebtoken";
import "dotenv/config";
import * as logService from "#services/log.service.js";
import * as usersService from "#services/users.service.js";
import { HttpMessage, HttpStatus } from "#helpers/http-status.js";
import { User } from "#models/user.model.js";
import {
  ConflictException,
  ServerErrorException,
  UnauthorizedException,
} from "#helpers/exceptions.js";

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user) return ConflictException(res);

  try {
    const newUser = await usersService.addUser(email);
    await newUser.setPassword(password);
    await newUser.save();

    res.status(HttpStatus.CREATED).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await usersService.loginUser(email);

  if (!user) return UnauthorizedException(res, HttpMessage.WRONG_CREDENTIALS);

  try {
    const isValidPassword = await user.validPassword(password);

    if (!isValidPassword)
      return UnauthorizedException(res, HttpMessage.WRONG_CREDENTIALS);

    const payload = {
      id: user._id,
      email: user.email,
      subscription: user.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "23h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(HttpStatus.OK).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

const currentUser = async (req, res) => {
  try {
    const { email, subscription } = req.user;

    return res.status(HttpStatus.OK).json({
      email,
      subscription,
    });
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { _id } = req.user;
    await usersService.logoutUser(_id);

    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    logService.error(error);
    ServerErrorException(res);
  }
};

export { createUser, loginUser, currentUser, logoutUser };
