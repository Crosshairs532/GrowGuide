import {
  loginService,
  registrationService,
} from "@/services/authService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  return useMutation({
    mutationKey: ["AUTH_LOGIN"],
    mutationFn: async (loginData: any) => {
      const res = await loginService(loginData);
      console.log(res);
      return res;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
};
