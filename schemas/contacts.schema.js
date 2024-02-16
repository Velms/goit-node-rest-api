import Joi from "joi";
import { VALIDATION } from "#helpers/constants.js";

const createContactSchema = Joi.object({
  name: Joi.string()
    .min(VALIDATION.CONTACT.NAME.MIN)
    .max(VALIDATION.CONTACT.NAME.MAX)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(VALIDATION.CONTACT.PHONE.PATTERN).required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(VALIDATION.CONTACT.NAME.MIN)
    .max(VALIDATION.CONTACT.NAME.MAX),
  email: Joi.string().email(),
  phone: Joi.string().pattern(VALIDATION.CONTACT.PHONE.PATTERN),
});

const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

export { createContactSchema, updateContactSchema, updateStatusContactSchema };
