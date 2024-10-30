import { axiosInstance, getErrorMessage } from "@/config";
import { SigninSchemaType, SignupSchemaType } from "@/schemas/auth-schemas";
import axios from "axios";

export const SignUpApi = async (values: SignupSchemaType) => {
  try {
    const response = await axiosInstance.post("/auth/signup", values);
    return response.data.message;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};

export const SignInApi = async (values: SigninSchemaType) => {
  try {
    const response = await axiosInstance.post("/auth/signin", values);
    return response.data.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};

export const SignOutApi = async () => {
  try {
    const response = await axiosInstance.post("/auth/signout");
    return response.data.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};

export const ForgotPasswordApi = async (email: string) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};

export const VerifyEmailApi = async (verificationCode: string) => {
  try {
    const response = await axiosInstance.post("/auth/verify-email", {
      verificationCode,
    });
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};

export const UpdatePasswordApi = async (token: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};

export type VerifyUserResponseType = {
  username: string;
  email: string;
  isVerified: boolean;
  lastLogin: Date | string;
  createdAt: Date;
};

export const VerifyUserApi =
  async (): Promise<VerifyUserResponseType | null> => {
    try {
      const response = await axiosInstance.get(`auth/verify-auth`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return null;
      } else {
        return null;
      }
    }
  };

export const ValidateResetTokenApi = async (token: string) => {
  try {
    const response = await axiosInstance.get(
      `/auth/validate-reset-token/${token}`
    );
    return response.data;
  } catch (error) {
    const message = getErrorMessage(error);
    throw new Error(message);
  }
};
