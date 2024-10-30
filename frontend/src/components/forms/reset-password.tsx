import { Lock, Loader, EyeClosed, Eye } from "lucide-react";
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
import { UpdatePasswordMutation } from "@/services/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateSchema, UpdateSchemaType } from "@/schemas/auth-schemas";

export default function ResetPasswordForm() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<UpdateSchemaType>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: UpdatePassword, isPending } = UpdatePasswordMutation(
    token || ""
  );

  const handleSubmit = (values: UpdateSchemaType) => {
    UpdatePassword(values.password);
    form.reset();
    navigate("/sign-in");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Lock className="absolute ml-2 w-4 h-4" />
                  <Input
                    className="pl-8"
                    {...field}
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
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader className="size-6 text-white animate-spin mx-auto" />
          ) : (
            "Change password"
          )}
        </Button>
      </form>
    </Form>
  );
}
