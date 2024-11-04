/* eslint-disable prettier/prettier */
"use server";
import AxiosInstance from "@/lib/AxiosInstance";
import { cookies } from "next/headers";

export const paymentService = async () => {
  const accessToken = cookies().get("accessToken")!.value as any;

  console.log(accessToken);
  const res = await fetch(
    "https://grow-guide-server.vercel.app/api/growGuide/payment",
    {
      method: "POST",
      headers: {
        Authorization: `${accessToken}`,
      },
    }
  );
  return res.json();
};

export const getPaymentHistory = async () => {
  const res = await AxiosInstance.get("/payment/payment-history");
  return res.data;
};

export const getPaymentChart = async () => {
  const res = await AxiosInstance.get("/payment/payment-history/chart");
  return res.data;
};
