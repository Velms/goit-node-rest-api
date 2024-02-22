import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Jimp from "jimp";
import gravatar from "gravatar";
import "dotenv/config";

import * as logService from "#services/log.service.js";
import * as usersService from "#services/users.service.js";
import * as elasticEmailService from "#services/elastic-email.service.js";
import { completeVerifyLink, fileDirectory } from "#helpers/utils.js";
import { HttpMessage, HttpStatus } from "#helpers/http-status.js";
import { User } from "#models/user.model.js";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  ServerErrorException,
  UnauthorizedException,
} from "#helpers/exceptions.js";
import { emailTemplate } from "#helpers/emailTemplate.js";

const secret = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await usersService.getUserByEmail(email);

  if (user) return ConflictException(res);

  try {
    const avatarUrl = gravatar.url(email, { s: "250" });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verifyLink = completeVerifyLink(verificationToken);
    const htmlTemplate = emailTemplate(verifyLink);
    const options = {
      to: email,
      htmlTemplate,
    };

    const newUser = await usersService.addUser(
      email,
      avatarUrl,
      verificationToken,
    );

    await elasticEmailService.sendEmail(options, res);
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
  try {
    const { email, password } = req.body;

    const user = await usersService.loginUser(email);

    if (!user) return UnauthorizedException(res, HttpMessage.WRONG_CREDENTIALS);

    if (!user.verify) {
      return UnauthorizedException(res, HttpMessage.EMAIL_NOT_VERIFIED);
    }

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

const uploadAvatar = async (req, res) => {
  try {
    const { file, user } = req;

    const tempFile = await Jimp.read(file.path);
    await tempFile.cover(250, 250).writeAsync(file.path);

    const { path: tempUpload, originalname } = file;

    const publicDirectory = fileDirectory("../", "public", "avatars");
    const filename = `${user._id}-${originalname}`;
    const uploadResult = path.join(publicDirectory, filename);

    await fs.rename(tempUpload, uploadResult);

    const avatarUrl = path.join("avatars", filename);
    await usersService.updateUserAvatar(user._id, avatarUrl);

    res.status(HttpStatus.OK).json({
      avatarUrl,
    });
  } catch (err) {
    logService.error(err);
    ServerErrorException(res);
  }
};

const verifyUserEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) return NotFoundException(res, HttpMessage.USER_NOT_FOUND);

    await usersService.verifyUserEmail(user._id);

    return res.json({
      message: HttpMessage.VERIFICATION_SUCCESS,
    });
  } catch (err) {
    logService.error(err);
    ServerErrorException(res);
  }
};

const resendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersService.getUserByEmail(email);

    if (!user) return NotFoundException(res, HttpMessage.USER_NOT_FOUND);

    if (user.verify)
      return BadRequestException(res, HttpMessage.EMAIL_ALREADY_VERIFIED);

    const verifyLink = completeVerifyLink(user.verificationToken);
    const htmlTemplate = emailTemplate(verifyLink);
    const options = {
      to: email,
      htmlTemplate,
    };

    await elasticEmailService.sendEmail(options, res);

    return res.json({
      message: HttpMessage.VERIFICATION_EMAIL_SENT,
    });
  } catch (err) {
    logService.error(err);
    ServerErrorException(res);
  }
};

export {
  createUser,
  loginUser,
  currentUser,
  logoutUser,
  uploadAvatar,
  verifyUserEmail,
  resendEmail,
};
