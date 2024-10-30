import { z } from "zod";

export const signInSchema = z.object({
  body: z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

export const signUpSchema = z.object({
  body: z.object({
    username: z.string().min(1, "Username is required").trim(),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
  }),
});
