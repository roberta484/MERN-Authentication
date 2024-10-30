import SignInForm from "@/components/forms/sign-in-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignInHead from "@/seo/sign-in-head";
import { Link } from "react-router-dom";

export default function SignInPage() {
  return (
    <>
      <SignInHead />
      <section className="flex min-h-screen justify-center items-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              By continuing, you agree to our User Agreement and acknowledge
              that you understand the Privacy Policy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
