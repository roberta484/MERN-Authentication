import mongoose from "mongoose";
import { IUser } from "../types";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
