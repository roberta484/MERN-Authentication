import { MailIcon, Loader } from "lucide-react";
import ErrorMessage from "../common/error-message-alert";
import SuccessMessage from "../common/success-message-alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordMutation } from "@/services/mutations";
import { useEffect } from "react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordForm() {
  const {
    mutate: ForgotPassword,
    isPending,
    error,
    data,
  } = ForgotPasswordMutation();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = form.watch("email");

  useEffect(() => {
    if (emailValue === "" && error) {
      error.message = "";
    }
  }, [emailValue, form, error]);

  const handleSubmit = (value: z.infer<typeof emailSchema>) => {
    ForgotPassword(value.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
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
        {error && <ErrorMessage message={error.message} />}
        {data && <SuccessMessage message={data?.message} />}
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader className="size-6 text-white animate-spin mx-auto" />
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>
    </Form>
  );
}
