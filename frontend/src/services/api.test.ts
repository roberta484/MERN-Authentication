import { SignInApi, SignOutApi, SignUpApi, VerifyUserApi } from "./api";

describe("Signup Api testing", () => {
  it("should return erorr message if user fields are not provided", async () => {
    const response = await SignUpApi({
      email: "",
      password: "",
      username: "",
    });
    expect(response).toBe("All fields are required");
  });
  it("should return error message if user already exists in db", async () => {
    const response = await SignUpApi({
      email: "existing@example.com",
      password: "random123456A$",
      username: "randomuser",
    });
    expect(response).toBe("Email already exists");
  });
  it("should return verification message if signup is success", async () => {
    const response = await SignUpApi({
      email: "notexisting@example.com",
      password: "random123456A$",
      username: "randomuser",
    });
    expect(response).toBe(
      "Check your inbox! We've sent you a verification email."
    );
  });
});

describe("Signin Api testing", () => {
  it("should return erorr message if user fields are not provided", async () => {
    const response = await SignInApi({
      email: "",
      password: "",
    });

    expect(response.success).toBeFalsy();
    expect(response.status).toBe(400);
    expect(response.message).toBe("All fields are required");
  });
  it("should return erorr message if user is doesnt exist", async () => {
    const response = await SignInApi({
      email: "notexisting@example.com",
      password: "password123456A$",
    });

    expect(response.success).toBeFalsy();
    expect(response.status).toBe(400);
    expect(response.message).toBe("User not found");
  });
  it("should return success message and 200 status if sign in success", async () => {
    const response = await SignInApi({
      email: "existing@example.com",
      password: "password123456A$",
    });

    expect(response.success).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.message).toBe(
      "Welcome back! You have signed in successfully."
    );
  });
});

describe("Signout Api testing", () => {
  it("should return erorr message if user fields are not provided", async () => {
    const response = await SignOutApi();

    expect(response.success).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.message).toBe("You have been successfully signed out.");
  });
});

describe("Verify Auth Api testing", () => {
  it("should return user data is verify auth is success", async () => {
    const response = await VerifyUserApi();

    expect(response?.email).toBe("randomuser@gmail.com");
    expect(response?.username).toBe("randomuser");
    expect(response?.isVerified).toBeTruthy();
  });
});
