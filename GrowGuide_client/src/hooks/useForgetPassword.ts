import { forgetPasswordService } from "@/services/authService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useForgetPassword = () => {
  return useMutation({
    mutationKey: ["AUTH_FORGET_PASSWORD"],
    mutationFn: async (emailData: any) => {
      console.log(emailData);
      const res = await forgetPasswordService(emailData);
      console.log(res, "useForgetword");
      return res;
    },
    onSuccess: () => {
      toast.success(`Check Your Email`);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
