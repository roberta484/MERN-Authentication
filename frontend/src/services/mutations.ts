import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ForgotPasswordApi,
  SignInApi,
  SignOutApi,
  SignUpApi,
  UpdatePasswordApi,
  VerifyEmailApi,
} from "./api";
import { useNavigate } from "react-router-dom";

export function SignUpMutation() {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: SignUpApi,
  });
}

export function SignInMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: SignInApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verify-user"] });
      navigate("/");
    },
  });
}

export function ForgotPasswordMutation() {
  return useMutation({
    mutationKey: ["forgot-pass"],
    mutationFn: ForgotPasswordApi,
  });
}

export function VerifyEmailMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["email-verify"],
    mutationFn: VerifyEmailApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
    },
  });
}

export function UpdatePasswordMutation(token: string) {
  return useMutation({
    mutationKey: ["update-pass", token],
    mutationFn: (password: string) => UpdatePasswordApi(token, password),
  });
}

export function SignOutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["sign-out"],
    mutationFn: SignOutApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["verify-user"] });
    },
  });
}
