/* eslint-disable prettier/prettier */
"use client";

import { getPaymentChart } from "@/services/payment/payment.service";
import { useQuery } from "@tanstack/react-query";

export const usePaymentchart = () => {
  return useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await getPaymentChart();
      return res.data;
    },
  });
};
