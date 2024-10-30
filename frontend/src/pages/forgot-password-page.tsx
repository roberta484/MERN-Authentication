import ForgotPasswordForm from "@/components/forms/forgot-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordHead from "@/seo/forgot-password-head";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <>
      <ForgotPasswordHead />
      <section className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email and we'll send you a 6-digit code you can use to
              reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm">
              Go back to{" "}
              <Link to="/sign-in" className="underline">
                Sign in page
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
