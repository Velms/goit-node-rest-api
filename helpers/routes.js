export const ROUTES = {
  CONTACTS: {
    ROOT: "/api/contacts",
    GET_ALL: "/",
    GET_ONE: "/:id",
    DELETE: "/:id",
    CREATE: "/",
    UPDATE: "/:id",
    UPDATE_STATUS: "/:id/favorite",
  },
  USERS: {
    ROOT: "/api/users",
    REGISTER: "/register",
    LOGIN: "/login",
    CURRENT: "/current",
    LOGOUT: "/logout",
    AVATARS: "/avatars",
    VERIFY: "/verify",
    VERIFICATION: "/verify/:verificationToken",
  },
};
