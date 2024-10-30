import { transporter } from "../utils";
import {
  ResetPasswordEmailTemplate,
  ResetSuccessEmailTemplate,
  VerificationEmailTemplate,
  WelcomeEmailTemplate,
} from "./email-template";
import { ParsedEnv } from "../config/env-config";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  await transporter.sendMail({
    from: ParsedEnv.EMAIL_FROM,
    to: email,
    subject: "Verify your account",
    html: VerificationEmailTemplate(verificationToken),
  });
};

export const sendWelcomeEmail = async (email: string, username: string) => {
  await transporter.sendMail({
    from: ParsedEnv.EMAIL_FROM,
    to: email,
    subject: "Welcome to our community",
    html: WelcomeEmailTemplate(username, email),
  });
};

export const sendResetPasswordEmail = async (email: string, token: string) => {
  const verificationLink = `${ParsedEnv.FRONTEND_URL}/reset-password/${token}`;
  await transporter.sendMail({
    from: ParsedEnv.EMAIL_FROM,
    to: email,
    subject: "Reset password",
    html: ResetPasswordEmailTemplate(verificationLink, email),
  });
};

export const sendResetPasswordSuccessEmail = async (email: string) => {
  await transporter.sendMail({
    from: ParsedEnv.EMAIL_FROM,
    to: email,
    subject: "Reset success",
    html: ResetSuccessEmailTemplate(email),
  });
};
