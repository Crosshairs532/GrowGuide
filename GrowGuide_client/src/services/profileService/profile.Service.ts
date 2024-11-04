/* eslint-disable prettier/prettier */
"use server";
import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

// ! get current user
export const getData = async (id: string) => {
  console.log({ id });
  const res = await nexiosInstance.get(`/user-management/user?id=${id}`);
  return res?.data;
};

export const getUsers = async () => {
  const res = await nexiosInstance.get("/user-management/users", {
    cache: "no-store",
  });
  return res?.data;
};
