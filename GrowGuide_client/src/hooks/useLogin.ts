/* eslint-disable prettier/prettier */
import {
  loginService,
  registrationService,
} from "@/services/authService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["AUTH_LOGIN"],
    mutationFn: async (loginData: any) => {
      const res = await loginService(loginData);

      return res;
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
