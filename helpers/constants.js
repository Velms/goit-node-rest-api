export const MODEL_NAME = {
  CONTACT: "Contact",
  USER: "User",
};

export const SALT = 10;

export const DEFAULT_PORT = 3000;

export const VALIDATION = {
  USER:{
    NAME: {
      MIN: 6,
      MAX: 20,
    },
  },
  CONTACT: {
    NAME:{
      MIN: 3,
      MAX: 20,
    },
    PHONE: {PATTERN: new RegExp("^[0-9]{10}$"),
  },
  },
};
