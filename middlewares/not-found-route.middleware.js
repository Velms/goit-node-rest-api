import { HttpMessage } from "#helpers/http-status.js";
import { NotFoundException } from "#helpers/exceptions.js";

export const notFoundRouteMiddleware = (_, res) => {
  return NotFoundException(res, HttpMessage.ROUTE_NOT_FOUND);
};
