/* eslint-disable prettier/prettier */
import { resetPasswordService } from "@/services/authService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["AUTH_RESET_PASSWORD"],
    mutationFn: async (resetData: any) => {
      const res = await resetPasswordService(resetData);
      return res;
    },
    onSuccess: () => {
      toast.success(`Password has been Reset!`);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
