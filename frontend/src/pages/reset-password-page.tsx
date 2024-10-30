import ResetPasswordForm from "@/components/forms/reset-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordHead from "@/seo/reset-password-head";

import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  return (
    <>
      <ResetPasswordHead />
      <section className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Change your password</CardTitle>
            <CardDescription>
              Enter your a new password below to change your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm />
          </CardContent>
          <CardFooter>
            <div className="mt-4 text-sm">
              Remembered your password ?{" "}
              <Link to="/sign-in" className="underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
