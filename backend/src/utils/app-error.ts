import { HttpStatusCode } from "../constants";

export class AppError extends Error {
  statusCode: HttpStatusCode;
  constructor(message: string, statusCode: HttpStatusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
