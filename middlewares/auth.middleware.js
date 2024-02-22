import passport from "passport";
import { HttpMessage } from "#helpers/http-status.js";
import { UnauthorizedException } from "#helpers/exceptions.js";

export const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return UnauthorizedException(res);

  const [_, token] = authorization?.split(" ");

  passport.authenticate("jwt", { session: false }, (err, user) => {
    const isTokenInvalid = !user || err || !user.token || user.token !== token;

    if (isTokenInvalid)
      return UnauthorizedException(res, HttpMessage.UNAUTHORIZED);

    req.user = user;

    next();
  })(req, res, next);
};
