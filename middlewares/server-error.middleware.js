import { HttpMessage, HttpStatus } from "#helpers/http-status.js";

export const serverErrorMiddleware = (err, req, res, next) => {
  const {
    status = HttpStatus.INTERNAL_SERVER_ERROR,
    message = HttpMessage.INTERNAL_SERVER_ERROR,
  } = err;

  res.status(status).json({ message });
};
