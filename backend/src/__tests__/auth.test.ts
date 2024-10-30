import request from "supertest";
import app from "../app";
import { User } from "../models/user-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ErrorMessages, SuccessMessages } from "../constants";

jest.mock("../models/user-model");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../helpers", () => ({
  sendVerificationEmail: jest.fn(),
  sendWelcomeEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
  sendResetPasswordSuccessEmail: jest.fn(),
}));

describe("Auth controller testing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Sign Up", () => {
    it("should creater a new user and send verification email", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue({
        id: "mockId",
        save: jest.fn(),
      });
      (bcrypt.hash as jest.Mock).mockResolvedValue("mockHashedPassword");
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      const response = await request(app).post("/api/v1/auth/signup").send({
        username: "mockUsername",
        email: "mockEmail@example.com",
        password: "mockPassword1234A$",
      });
      expect(response.status).toBe(201);
      expect(response.body.message).toBe(
        SuccessMessages.VERIFICATION_EMAIL_SENT
      );
      expect(response.body.success).toBe(true);
    });
    it("should return error if user exist already", async () => {
      (User.findOne as jest.Mock).mockResolvedValueOnce({});
      const response = await request(app).post("/api/v1/auth/signup").send({
        username: "mockUsername",
        email: "mockEmail@example.com",
        password: "mockPassword1234A$",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(ErrorMessages.USER_ALREADY_EXISTS);
    });
    it("should return 500 status if password validation fails", async () => {
      const response = await request(app).post("/api/v1/auth/signup").send({
        username: "mockUsername",
        email: "mockEmail@example.com",
        password: "mockPassword",
      });
      expect(response.status).toBe(500);
      expect(response.body.errors.body).not.toHaveLength(0);
    });
  });

  describe("Verify email api", () => {
    it("should verify email and return 200 status code", async () => {
      const mockUser = {
        isVerified: false,
        verificationToken: "123456",
        verificationExpires: new Date(Date.now() + 3600000),
        save: jest.fn(),
        email: "test@example.com",
        username: "testuser",
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/api/v1/auth/verify-email")
        .send({
          verificationCode: "123456",
        });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(SuccessMessages.USER_VERIFIED);
    });
    it("should return 401 if verification code is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .post("/api/v1/auth/verify-email")
        .send({
          verificationCode: "",
        });
      expect(response.status).toBe(401);
      expect(response.body.message).toBe(ErrorMessages.INVALID_TOKEN);
    });
  });

  describe("Sign in api", () => {
    it("should sign in and return 200 status code", async () => {
      const mockUser = {
        id: "mockId",
        email: "test@example.com",
        password: "hashedPassword",
        username: "testuser",
        isVerified: true,
        lastLogin: null,
        save: jest.fn(),
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");
      const response = await request(app).post("/api/v1/auth/signin").send({
        email: "test@example.com",
        password: "password123456A$",
      });
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(SuccessMessages.SIGNIN_SUCCESS);
    });
    it("should return 404 if user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const response = await request(app).post("/api/v1/auth/signin").send({
        email: "test@example.com",
        password: "password123456A$",
      });
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(ErrorMessages.USER_NOT_FOUND);
    });
    it("should return 400 if password is incorrect", async () => {
      const mockUser = {
        id: "mockId",
        email: "test@example.com",
        password: "hashedPassword",
        username: "testuser",
        isVerified: true,
        lastLogin: null,
        save: jest.fn(),
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const response = await request(app).post("/api/v1/auth/signin").send({
        email: "test@example.com",
        password: "password123456A$",
      });
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(ErrorMessages.INVALID_PASSWORD);
    });
  });

  describe("Sign out api", () => {
    it("should sign out and clear cookie", async () => {
      const response = await request(app).post("/api/v1/auth/signout");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(SuccessMessages.SIGNOUT_SUCCESS);
      expect(response.header["auth"]).toBeUndefined();
    });
  });

  describe("Forgot password api", () => {
    it("should send reset password email and return 200 status code", async () => {
      const mockUser = {
        email: ";test@example.com",
        save: jest.fn(),
      };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      const response = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({
          email: "test@example.com",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(SuccessMessages.PASSWORD_RESET_SENT);
    });

    it("should return 404 if user not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({
          email: "nonexistingemail",
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(ErrorMessages.USER_NOT_FOUND);
    });
  });

  describe("Reset password api", () => {
    it("should reset password and return 200 status code", async () => {
      const mockUser = {
        resetPasswordToken: "validtoken",
        resetPasswordExpires: new Date(Date.now() + 3600000),
        save: jest.fn(),
        email: "test@example.com",
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue("newHashedPassword");
      const response = await request(app)
        .post("/api/v1/auth/reset-password/token")
        .send({
          password: "password123456A$",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        SuccessMessages.PASSWORD_RESET_SUCCESS
      );
    });
    it("should return 401 if token is invalid", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .post("/api/v1/auth/reset-password/token")
        .send({
          password: "password123456A$",
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe(ErrorMessages.INVALID_TOKEN);
    });
  });
});
