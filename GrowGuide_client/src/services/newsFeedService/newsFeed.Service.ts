"use server";
import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

export const getAllPosts = async () => {
  try {
    const response = await nexiosInstance.get("/post/posts", {
      cache: "no-store",
      next: {
        tags: ["post"],
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
