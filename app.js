import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import passport from "passport";

import { DEFAULT_PORT } from "#helpers/constants.js";
import { HttpMessage } from "#helpers/http-status.js";
import { ROUTES } from "#helpers/routes.js";
import {
  authMiddleware,
  notFoundRouteMiddleware,
  serverErrorMiddleware,
  validateContactsBodyMiddleware,
} from "#middlewares/index.js";
import { validateUsersBodyMiddleware } from "#middlewares/validate-users-body.middleware.js";
import { contactsRouter } from "#routes/contacts.router.js";
import { usersRouter } from "#routes/users.router.js";
import * as logService from "#services/log.service.js";
import { jwtStrategy } from "#strategy/jwt.strategy.js";

const app = express();

// Strategies
passport.use(jwtStrategy);

// Global middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Middlewares
app.use(ROUTES.USERS.ROOT + ROUTES.USERS.CURRENT, authMiddleware);
app.use(ROUTES.USERS.ROOT + ROUTES.USERS.LOGOUT, authMiddleware);
app.use(ROUTES.CONTACTS.ROOT, authMiddleware);
app.use(ROUTES.USERS.ROOT, validateUsersBodyMiddleware);
app.use(ROUTES.CONTACTS.ROOT, validateContactsBodyMiddleware);

// App routes
app.use(ROUTES.USERS.ROOT, usersRouter);
app.use(ROUTES.CONTACTS.ROOT, contactsRouter);

// Error handlers
app.use(notFoundRouteMiddleware);
app.use(serverErrorMiddleware);

const PORT = process.env.PORT ?? DEFAULT_PORT;
const URI_DB = process.env.DB_HOST;

// Connect to database
(async () => {
  try {
    await mongoose.connect(URI_DB);

    logService.success(HttpMessage.DATABASE_RUNNING_SUCCESS);

    app.listen(PORT, () => {
      logService.info(`${HttpMessage.SERVER_RUNNING_SUCCESS}: ${PORT}`);
    });
  } catch (err) {
    logService.error(`${HttpMessage.SERVER_RUNNING_ERROR}: ${err.message}`);
    process.exit(1);
  }
})();
