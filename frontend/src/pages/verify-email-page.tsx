import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import VerifyEmailHead from "@/seo/verify-email-head";
import { SignOutMutation, VerifyEmailMutation } from "@/services/mutations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const { mutate: verifyEmail, isPending: isVerifyPending } =
    VerifyEmailMutation();
  const { mutate: SignOut, isPending } = SignOutMutation();

  const handleSubmit = () => {
    verifyEmail(value);
    navigate("/sign-in");
  };

  const handleSignout = () => {
    SignOut();
    navigate("/sign-in");
  };

  return (
    <>
      <VerifyEmailHead />
      <section className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader className="space-y-4">
            <CardTitle className="text-2xl">Verify Email</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup className="space-x-6">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full text-white font-bold"
              disabled={isVerifyPending}
              onClick={handleSubmit}
            >
              Verify Email
            </Button>
            <Button
              className="w-full font-bold"
              variant={"outline"}
              disabled={isPending}
              onClick={handleSignout}
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
