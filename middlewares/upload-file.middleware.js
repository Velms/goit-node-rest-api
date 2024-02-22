import multer from "multer";
import { fileDirectory } from "#helpers/utils.js";

const tempDirectory = fileDirectory("../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDirectory,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploadMiddleware = multer({ storage: multerConfig });
