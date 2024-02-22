import { BadRequestException } from "#helpers/exceptions.js";
import {
  createAndLoginUserSchema,
  verifyUserEmailSchema,
} from "#schemas/users.schema.js";
import { ROUTES } from "#helpers/routes.js";

export const validateUsersBodyMiddleware = (req, res, next) => {
  const { pathname } = req._parsedUrl;

  if (pathname === ROUTES.USERS.ROOT + ROUTES.USERS.LOGOUT) return next();

  if (req.method === "POST") {
    const { error } =
      pathname === ROUTES.USERS.ROOT + ROUTES.USERS.VERIFY
        ? verifyUserEmailSchema.validate(req.body)
        : createAndLoginUserSchema.validate(req.body);

    if (error) return BadRequestException(res, error?.message);
  }

  next();
};
