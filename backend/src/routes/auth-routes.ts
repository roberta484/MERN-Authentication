import { Router } from "express";
import * as auth from "../controllers/auth-controller";
import { AuthMiddleware, ValidationMiddleware } from "../middlewares";
import { signInSchema, signUpSchema } from "../schemas/auth-schema";

const authRoutes = Router();
authRoutes.get("/verify-auth", AuthMiddleware, auth.VerifyAuthApi);
authRoutes.post("/signup", ValidationMiddleware(signUpSchema), auth.SignUpApi);
authRoutes.post("/signin", ValidationMiddleware(signInSchema), auth.SignInApi);
authRoutes.post("/signout", auth.SignOutApi);
authRoutes.post("/verify-email", auth.VerifyEmailApi);
authRoutes.post("/forgot-password", auth.ForgotPasswordApi);
authRoutes.post("/reset-password/:token", auth.ResetPasswordApi);

export default authRoutes;
