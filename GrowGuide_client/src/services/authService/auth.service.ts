"use server";
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
    console.log(res, "forget service");
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
