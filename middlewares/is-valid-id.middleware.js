import { isValidObjectId } from "mongoose";
import { BadRequestException } from "#helpers/exceptions.js";
import { HttpMessage } from "#helpers/http-status.js";

export const isValidIdMiddleware = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id))
    return BadRequestException(res, `${HttpMessage.INVALID_ID} - ${id}`);

  next();
};
