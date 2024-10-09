"use server";
import { cookies, headers } from "next/headers";

import { AxiosInstance } from "@/lib/AxiosInstance";

export const registrationService = async (userData: any) => {
  console.log(userData.get("data"), "kothay");
  try {
    const res = await AxiosInstance.post("/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const forgetPasswordService = async (data: { email: string }) => {
  try {
    const res = await AxiosInstance.post("/auth/forget-password", data);

    return res.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const resetPasswordService = async (data: any) => {
  try {
    cookies().set("accessToken", data.accessToken);
    const res = await AxiosInstance.post("/auth/reset-password", data);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};
