import { HttpMessage, HttpStatus } from "#helpers/http-status.js";

const NotFoundException = (res, message = "") => {
  return res
    .status(HttpStatus.NOT_FOUND)
    .send({ message: message || HttpMessage.NOT_FOUND });
};

const BadRequestException = (res, message = "") => {
  return res
    .status(HttpStatus.BAD_REQUEST)
    .send({ message: message || HttpMessage.BAD_REQUEST });
};

const EmptyBodyException = (res, message = "") => {
  return res
    .status(HttpStatus.BAD_REQUEST)
    .send({ message: message || HttpMessage.EMPTY_BODY });
};

const ServerErrorException = (res, message = "") => {
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({ message: message || HttpMessage.INTERNAL_SERVER_ERROR });
};

const ConflictException = (res, message = "") => {
  return res.status(HttpStatus.CONFLICT).send({
    message: message || HttpMessage.CONFLICT_EMAIL,
  });
};

const UnauthorizedException = (res, message = "") => {
  return res.status(HttpStatus.UNAUTHORIZED).send({
    message: message || HttpMessage.UNAUTHORIZED,
  });
};

export {
  NotFoundException,
  BadRequestException,
  EmptyBodyException,
  ServerErrorException,
  ConflictException,
  UnauthorizedException,
};
