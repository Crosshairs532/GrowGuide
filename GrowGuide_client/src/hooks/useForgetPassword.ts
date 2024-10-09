import { forgetPasswordService } from "@/services/authService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useForgetPassword = () => {
  return useMutation({
    mutationKey: ["AUTH_FORGET_PASSWORD"],
    mutationFn: async (emailData: any) =>
      await forgetPasswordService(emailData),
    onSuccess: () => {
      toast.success(`Check Your Email`);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });
};
