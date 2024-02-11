import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import validateBodyMiddleware from "./middlewares/validateBodyMiddleware.js";
import * as logService from "./services/logService.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", validateBodyMiddleware);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;

  res.status(status).json({ message });
});

const PORT = process.env.PORT ?? 3000;
const URI_DB = process.env.DB_HOST;

(async () => {
  try {
    await mongoose.connect(URI_DB);

    logService.success("Database connection successful");

    app.listen(PORT, () => {
      logService.info(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    logService.error(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
})();
