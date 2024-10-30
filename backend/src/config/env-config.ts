import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvVariables = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().min(1).max(4),
  CORS_ORIGIN: z.string().min(1),
  FRONTEND_URL: z.string().min(1),
  MONGO_DB_URI: z.string().min(1).readonly(),
  ACCESS_SECRET_KEY: z.string().min(1),
  ACCESS_TOKEN_EXPIRE_TIME: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  EMAIL_SERVER_USER: z.string().min(1),
  EMAIL_SERVER_PASSWORD: z.string().min(1),
  EMAIL_SERVER_HOST: z.string().min(1),
  EMAIL_SERVER_PORT: z.string().min(1),
});

export const ParsedEnv = EnvVariables.parse(process.env);
