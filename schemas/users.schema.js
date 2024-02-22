import Joi from "joi";
import { VALIDATION } from "#helpers/constants.js";

const createAndLoginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(VALIDATION.USER.NAME.MIN)
    .max(VALIDATION.USER.NAME.MAX)
    .alphanum()
    .required(),
});

const verifyUserEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export { createAndLoginUserSchema, verifyUserEmailSchema };
