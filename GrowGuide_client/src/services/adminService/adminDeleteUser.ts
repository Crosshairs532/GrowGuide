/* eslint-disable prettier/prettier */
"use server";
import AxiosInstance from "@/lib/AxiosInstance";

export const adminDeleteUser = async (id: string) => {
  const res = await AxiosInstance.delete(
    `/user-management/delete-user?userId=${id}`
  );

  return res.data;
};
export const adminGetPayment = async (id: string) => {
  const res = await AxiosInstance.delete(
    `/user-management/delete-user?userId=${id}`
  );
  return res.data;
};
