import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { AppError, AsyncHandler } from "../utils";
import { ErrorMessages, HttpStatusCode, SuccessMessages } from "../constants";
import { ParsedEnv } from "../config/env-config";
import { User } from "../models/user-model";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../helpers";

export const SignUpApi = AsyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      ErrorMessages.USER_ALREADY_EXISTS,
      HttpStatusCode.BAD_REQUEST
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const user = await User.create({
    email,
    password: hashedPassword,
    username,
    verificationToken,
    verificationExpires: Date.now() + 60 * 60 * 1000,
  });

  await user.save();

  const token = jwt.sign({ id: user.id }, ParsedEnv.ACCESS_SECRET_KEY, {
    expiresIn: ParsedEnv.ACCESS_TOKEN_EXPIRE_TIME,
  });

  await sendVerificationEmail(user.email, verificationToken);

  res
    .cookie("auth", token, {
      httpOnly: true,
      secure: ParsedEnv.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    })
    .status(HttpStatusCode.CREATED)
    .json({
      message: SuccessMessages.VERIFICATION_EMAIL_SENT,
      success: true,
    });
});

export const VerifyEmailApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { verificationCode } = req.body;

    const existingUser = await User.findOne({
      verificationToken: verificationCode,
      verificationExpires: { $gt: Date.now() },
    });

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.INVALID_TOKEN,
        HttpStatusCode.UNAUTHORIZED
      );
    }

    existingUser.isVerified = true;
    existingUser.verificationToken = null;
    existingUser.verificationExpires = null;
    await existingUser.save();

    await sendWelcomeEmail(existingUser.email, existingUser.username);

    const user = {
      username: existingUser.username,
      email: existingUser.email,
      isVerified: existingUser.isVerified,
    };

    res.status(HttpStatusCode.OK).json({
      message: SuccessMessages.USER_VERIFIED,
      success: true,
      data: user,
    });
  }
);

export const SignInApi = AsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    throw new AppError(
      ErrorMessages.INVALID_PASSWORD,
      HttpStatusCode.BAD_REQUEST
    );
  }

  const token = jwt.sign({ id: existingUser.id }, ParsedEnv.ACCESS_SECRET_KEY, {
    expiresIn: ParsedEnv.ACCESS_TOKEN_EXPIRE_TIME,
  });

  existingUser.lastLogin = Date.now();
  await existingUser.save();

  const user = {
    username: existingUser.username,
    email: existingUser.email,
    isVerified: existingUser.isVerified,
  };

  res
    .cookie("auth", token, {
      httpOnly: true,
      secure: ParsedEnv.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24,
    })
    .status(HttpStatusCode.OK)
    .json({
      message: SuccessMessages.SIGNIN_SUCCESS,
      success: true,
      data: user,
    });
});

export const SignOutApi = AsyncHandler(async (req: Request, res: Response) => {
  res
    .clearCookie("auth")
    .status(HttpStatusCode.OK)
    .json({ message: SuccessMessages.SIGNOUT_SUCCESS, success: true });
});

export const ForgotPasswordApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    const token = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

    existingUser.resetPasswordToken = token;
    existingUser.resetPasswordExpires = resetTokenExpiresAt;
    await existingUser.save();

    await sendResetPasswordEmail(email, token);

    res
      .status(HttpStatusCode.OK)
      .json({ message: SuccessMessages.PASSWORD_RESET_SENT, success: true });
  }
);

export const ResetPasswordApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;
    const existingUser = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!existingUser) {
      throw new AppError(
        ErrorMessages.INVALID_TOKEN,
        HttpStatusCode.UNAUTHORIZED
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    existingUser.password = hashedPassword;
    existingUser.resetPasswordToken = null;
    existingUser.resetPasswordExpires = null;
    await existingUser.save();

    await sendResetPasswordSuccessEmail(existingUser.email);

    res.status(HttpStatusCode.OK).json({
      message: SuccessMessages.PASSWORD_RESET_SUCCESS,
      success: true,
    });
  }
);

export const VerifyAuthApi = AsyncHandler(
  async (req: Request, res: Response) => {
    const existingUser = await User.findById(req.user?.id).select("-password");
    if (!existingUser) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    res.status(HttpStatusCode.OK).json({
      message: SuccessMessages.AUTHORIZATION_SUCCESS,
      success: true,
      data: existingUser,
    });
  }
);
