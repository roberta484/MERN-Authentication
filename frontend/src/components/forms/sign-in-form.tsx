import { MailIcon, Lock, Eye, EyeClosed, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInMutation } from "@/services/mutations";
import { SignInSchema, SigninSchemaType } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../common/error-message-alert";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: SignIn, isPending, error } = SignInMutation();

  const handleSubmit = (values: SigninSchemaType) => {
    SignIn(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <MailIcon className="absolute ml-2 w-4 h-4" />
                  <Input
                    className="pl-8"
                    placeholder="m@example.com"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <div className="relative flex items-center">
                  <Lock className="absolute ml-2 w-4 h-4" />
                  <Input
                    className="pl-8"
                    {...field}
                    placeholder="************"
                    type={showPassword ? "text" : "password"}
                  />
                  {showPassword ? (
                    <Eye
                      className="absolute right-4 ml-2 w-4 h-4 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeClosed
                      className="absolute right-4 ml-2 w-4 h-4 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ErrorMessage message={error.message} />}
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader className="size-6 text-white animate-spin mx-auto" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}
