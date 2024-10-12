"use server";
import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

export const getData = async (id: string, email: string) => {
  const res = await nexiosInstance.get(
    `/user-management/user?id=${id}&email=${email}`
  );
  return res.data;
};

export const getUsers = async () => {
  const res = await nexiosInstance.get("/user-management/users", {
    cache: "no-store",
  });
  return res?.data;
};
