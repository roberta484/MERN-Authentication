import SignUpForm from "@/components/forms/sign-up-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpHead from "@/seo/sign-up-head";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  return (
    <>
      <SignUpHead />
      <section className="flex justify-center items-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
