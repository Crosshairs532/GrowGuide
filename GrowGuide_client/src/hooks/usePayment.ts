/* eslint-disable prettier/prettier */
import { paymentService } from "@/services/payment/payment.service";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  const paymentMutation = useMutation({
    mutationKey: ["payment"],
    mutationFn: async () => {
      const res = await paymentService();
      return res.data;
    },
  });

  return paymentMutation;
};
