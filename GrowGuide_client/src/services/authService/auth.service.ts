"use server";
import { cookies, headers } from "next/headers";

import { jwtDecode, JwtPayload } from "jwt-decode";
import AxiosInstance from "@/lib/AxiosInstance";

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

export const loginService = async (userData: any) => {
  try {
    const res = await AxiosInstance.post("/auth/login", userData);
    console.log(res);
    const token = res?.data?.data?.accessToken;
    console.log(token);
    cookies().set("accessToken", token);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
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

export const getUserService = async () => {
  const tokenValue = cookies()?.get("accessToken");
  let token;
  let decoded = null;
  if (tokenValue) {
    token = cookies()?.get("accessToken")!.value;
    decoded = (await jwtDecode(token)) as JwtPayload;
  }

  return decoded;

  // console.log({ decoded });

  // if (decoded) {
  //   const res = await AxiosInstance.get(
  //     `/user-management/user?email=${decoded?.email} `
  //   );
};

export const profileUpdate = async (updateData: any) => {
  console.log(updateData, "hhhhhhhhhh");
  const res = await AxiosInstance.put(
    "/user-management/profile-update",
    updateData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  cookies().set("accessToken", res?.data?.data?.accessToken);

  return res.data;
};

export const logout = () => {
  cookies().delete("accessToken");
};
