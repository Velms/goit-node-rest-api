import { isBodyEmpty } from "#helpers/utils.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "#schemas/contacts.schema.js";
import {
  EmptyBodyException,
  BadRequestException,
} from "#helpers/exceptions.js";

export const validateContactsBodyMiddleware = (req, res, next) => {
  if (req.method === "POST") {
    const { error } = createContactSchema.validate(req.body);

    if (error) return BadRequestException(res, error?.message);
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    if (isBodyEmpty(req)) return EmptyBodyException(res);

    const { error } =
      req.method === "PUT"
        ? updateContactSchema.validate(req.body)
        : updateStatusContactSchema.validate(req.body);

    if (error) return BadRequestException(res, error?.message);
  }

  next();
};
