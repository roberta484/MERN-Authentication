import express, { type Application } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares";
import authRoutes from "./routes/auth-routes";
import { limiter } from "./config/rate-limiting";

const app: Application = express();
dotenv.config();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(limiter);
app.use("/api/v1/auth", authRoutes);

app.use(ErrorMiddleware);

export default app;
