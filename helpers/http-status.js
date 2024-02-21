export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const HttpMessage = {
  BAD_REQUEST: "Bad request",
  FORBIDDEN: "Forbidden",
  INTERNAL_SERVER_ERROR: "Internal server error",
  NOT_FOUND: "Not found",
  ROUTE_NOT_FOUND: "Route not found",
  NO_CONTENT: "No content",
  UNAUTHORIZED: "Not authorized",
  WRONG_CREDENTIALS: "Email or password is wrong",
  EMPTY_BODY: "Body must have at least one field",
  INVALID_ID: "Invalid id",
  CONFLICT_EMAIL: "Email is already in use",
  REGISTRATION_SUCCESS: "Registration successful",
  LOGOUT_SUCCESS: "Logout successful",
  USER_NOT_FOUND: "UserModel not found",
  DATABASE_RUNNING_SUCCESS: "Database connection successful",
  SERVER_RUNNING_SUCCESS: "Server running. Use our API on port",
  SERVER_RUNNING_ERROR: "Server not running. Error message",
  EMPTY_FORM_DATA:
    "Form data is empty. Please add your file to field 'avatar' and try again",
};
