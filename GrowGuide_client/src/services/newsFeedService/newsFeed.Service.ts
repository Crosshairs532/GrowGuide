"use server";
import { AxiosInstance } from "@/lib/AxiosInstance";
import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

export const getAllPosts = async () => {
  try {
    const response = await nexiosInstance.get("/post/posts", {
      cache: "no-store",
      next: {
        tags: ["post"],
      },
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
