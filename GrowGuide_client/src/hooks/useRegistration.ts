import { registrationService } from "@/services/authService/auth.service";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export const useRegistration = () => {
  return useMutation({
    mutationKey: ["AUTH_REGISTRATION"],
    mutationFn: async (registrationData: any) => {
      const res = await registrationService(registrationData);
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
