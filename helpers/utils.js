import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

import { EmptyBodyException } from "#helpers/exceptions.js";
import { HttpMessage } from "#helpers/http-status.js";
import { ROUTES } from "#helpers/routes.js";

const HOST_URL = process.env.HOST_URL;

export const fileDirectory = (...dirName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  return path.join(__dirname, ...dirName);
};

export const isBodyEmpty = (req) => {
  return Object.keys(req.body).length === 0;
};

export const isFileEmpty = (req, res, next) => {
  const isFileEmpty =
    req.file === undefined || Object.keys(req.file).length === 0;

  if (isFileEmpty) {
    return EmptyBodyException(res, HttpMessage.EMPTY_FORM_DATA);
  }

  next();
};

export const completeVerifyLink = (verificationToken) => {
  const completeLink =
    HOST_URL +
    ROUTES.USERS.ROOT +
    ROUTES.USERS.VERIFY +
    "/" +
    verificationToken;

  return completeLink;
};
