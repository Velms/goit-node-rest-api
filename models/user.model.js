import bCrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { MODEL_NAME, SALT } from "#helpers/constants.js";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
  avatarUrl: {
    type: String,
    required: true,
  },
});

userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, bCrypt.genSaltSync(SALT));
};

userSchema.methods.validPassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

export const User = model(MODEL_NAME.USER, userSchema);
