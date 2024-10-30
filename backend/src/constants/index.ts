export enum SuccessMessages {
  MONGO_CONNECTION_SUCCESS = "MongoDB connected successfully",
  RESET_EMAIL_SENT = "Reset password link sent to your email",
  VERIFICATION_EMAIL_SENT = "Check your inbox! We've sent you a verification email.",
  SIGNOUT_SUCCESS = "You have been successfully signed out.",
  SIGNIN_SUCCESS = "Welcome back! You have signed in successfully.",
  SIGNUP_SUCCESS = "Registration successful! Welcome aboard!",
  USER_VERIFIED = "Your account has been verified successfully.",
  AUTHORIZATION_SUCCESS = "Authorization successful!",
  PASSWORD_RESET_SENT = "Password reset link sent to your email",
  PASSWORD_RESET_SUCCESS = "Password reset successfully",
}
export enum ErrorMessages {
  MONGO_ENV_NOT_DEFINED = "MONGO_DB_URI environment variable not defined",
  MONGO_CONNECTION_ERROR = "MongoDB connection error= ",
  INVALID_ID = "The ID you entered is invalid.",
  INTERNAL_SERVER_ERROR = "Oops! Something went wrong. Please try again later.",
  USER_NOT_FOUND = "We couldn't find a user with that information. Please check and try again.",
  USER_ALREADY_EXISTS = "An account with this email already exists. Please try using a different one.",
  INVALID_PASSWORD = "The password you entered is incorrect. Please try again.",
  INVALID_TOKEN = "The token you entered is invalid. Please try again.",
  USER_NOT_VERIFIED = "Your account has not been verified. Please check your email.",
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}
