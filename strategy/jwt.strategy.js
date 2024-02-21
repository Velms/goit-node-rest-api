import jwt from "passport-jwt";
import "dotenv/config";
import { User } from "#models/user.model.js";
import { HttpMessage } from "#helpers/http-status.js";

const secret = process.env.JWT_SECRET;
const ExtractJWT = jwt.ExtractJwt;
const Strategy = jwt.Strategy;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

export const jwtStrategy = new Strategy(params, async (payload, next) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) return next(new Error(HttpMessage.USER_NOT_FOUND));

    return next(null, user);
  } catch (err) {
    next(err);
  }
});
