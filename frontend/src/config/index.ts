import axios, { isAxiosError } from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const message = error.response?.data.message || "An error occured";
    throw new Error(message);
  } else {
    throw new Error("An unexpected error occured");
  }
};

export { axiosInstance, getErrorMessage };
