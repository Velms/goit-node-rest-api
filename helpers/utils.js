export const isBodyEmpty = (req) => {
  return Object.keys(req.body).legth === 0;
};
export const validateSchema = (schema, req) => {
  return schema.validate(req.body);
};