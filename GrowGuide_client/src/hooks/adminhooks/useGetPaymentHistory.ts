/* eslint-disable prettier/prettier */
import { getPaymentHistory } from "@/services/payment/payment.service";
import { useQuery } from "@tanstack/react-query";

export const useGetPaymentHistory = () => {
  return useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => {
      const res = await getPaymentHistory();

      return res.data;
    },
  });
};
