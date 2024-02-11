import {
    createContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
  } from "../schemas/contactsSchemas.js";
  import { isBodyEmpty } from "../helpers/isBodyEmpty.js";
  
  const validateBodyMiddleware = (req, res, next) => {
    if (req.method === "POST") {
      const { error } = createContactSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send({ message: error.message });
      }
    }
  
    if (req.method === "PUT") {
      if (isBodyEmpty(req)) {
        return res
          .status(400)
          .send({ message: "Body must have at least one field" });
      }
  
      const { error } = updateContactSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send({ message: error.message });
      }
    }
  
    if (req.method === "PATCH") {
      if (isBodyEmpty(req)) {
        return res
          .status(400)
          .send({ message: "Body must have at least one field" });
      }
  
      const { error } = updateStatusContactSchema.validate(req.body);
  
      if (error) {
        return res.status(400).send({ message: error.message });
      }
    }
  
    next();
  };
  
  export default validateBodyMiddleware;