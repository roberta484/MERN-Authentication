import { type RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils";
import { ErrorMessages } from "../constants";
import { IJwtPayload } from "../types";
import { ParsedEnv } from "../config/env-config";

export const AuthMiddleware: RequestHandler = (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) throw new AppError(ErrorMessages.INVALID_TOKEN, 401);

  try {
    const decoded = jwt.verify(
      token,
      ParsedEnv.ACCESS_SECRET_KEY
    ) as IJwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
