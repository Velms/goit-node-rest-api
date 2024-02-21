import { Schema, model } from "mongoose";
import { MODEL_NAME } from "#helpers/constants.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: MODEL_NAME.USER,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Contact = model(MODEL_NAME.CONTACT, contactSchema);
