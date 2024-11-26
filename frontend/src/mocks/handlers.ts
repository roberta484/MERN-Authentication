import { SigninSchemaType, SignupSchemaType } from "@/schemas/auth-schemas";
import { http, HttpResponse } from "msw";

async function parseJSONBody<T>(request: Request): Promise<T> {
  const body = (await request.json()) as T;
  return body;
}

export const handlers = [
  http.post("/api/v1/auth/signup", async ({ request }) => {
    try {
      const result = await parseJSONBody<SignupSchemaType>(request);
      if (!result.email || !result.password || !result.username) {
        return HttpResponse.json({
          message: "All fields are required",
        });
      }
      if (result.email === "existing@example.com") {
        return HttpResponse.json({
          message: "Email already exists",
        });
      }
      return HttpResponse.json({
        message: "Check your inbox! We've sent you a verification email.",
      });
    } catch {
      return HttpResponse.json({
        message: "Internal server error",
      });
    }
  }),
  http.post("/api/v1/auth/signin", async ({ request }) => {
    try {
      const result = await parseJSONBody<SigninSchemaType>(request);
      if (!result.email || !result.password) {
        return HttpResponse.json({
          data: {
            message: "All fields are required",
            success: false,
            status: 400,
          },
        });
      }
      if (result.email !== "existing@example.com") {
        return HttpResponse.json({
          data: {
            message: "User not found",
            success: false,
            status: 400,
          },
        });
      }
      return HttpResponse.json({
        data: {
          message: "Welcome back! You have signed in successfully.",
          success: true,
          status: 200,
        },
      });
    } catch {
      return HttpResponse.json({
        message: "Internal server error",
      });
    }
  }),
  http.post("/api/v1/auth/signout", async () => {
    try {
      return HttpResponse.json({
        data: {
          message: "You have been successfully signed out.",
          success: true,
          status: 200,
        },
      });
    } catch {
      return HttpResponse.json({
        message: "Internal server error",
      });
    }
  }),
  http.get("/api/v1/auth/verify-auth", async () => {
    try {
      return HttpResponse.json({
        data: {
          username: "randomuser",
          isVerified: true,
          email: "randomuser@gmail.com",
        },
      });
    } catch {
      return HttpResponse.json({
        message: "Internal server error",
      });
    }
  }),
];
