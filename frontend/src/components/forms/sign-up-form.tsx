import { MailIcon, Loader, Lock, Eye, EyeClosed, User } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpMutation } from "@/services/mutations";
import { SignUpSchema, SignupSchemaType } from "@/schemas/auth-schemas";
import ErrorMessage from "../common/error-message-alert";
import SuccessMessage from "../common/success-message-alert";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { mutate: Signup, isPending, error, data } = SignUpMutation();

  const handleSubmit = (values: SignupSchemaType) => {
    Signup(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <User className="absolute ml-2 w-4 h-4" />
                  <Input className="pl-8" placeholder="john_doe" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
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
        {data && <SuccessMessage message={data} />}
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader className="size-6 text-white animate-spin mx-auto" />
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
