export const isBodyEmpty = (req) => {
  return Object.keys(req.body).length === 0;
};
