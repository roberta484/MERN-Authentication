import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  lastLogin: Date | number;
  isVerified: boolean;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null | number;
  verificationToken: string | null;
  verificationExpires: Date | null;
}

export interface IJwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IJwtPayload;
    }
  }
}
