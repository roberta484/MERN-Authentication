import nodemailer from "nodemailer";
import "dotenv/config";
import { ParsedEnv } from "../config/env-config";

export const transporter = nodemailer.createTransport({
  host: ParsedEnv.EMAIL_SERVER_HOST,
  port: parseInt(ParsedEnv.EMAIL_SERVER_PORT || "465"),
  secure: true,
  auth: {
    user: ParsedEnv.EMAIL_SERVER_USER,
    pass: ParsedEnv.EMAIL_SERVER_PASSWORD,
  },
});
