import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

export const useGetAllPosts = async () => {
  try {
    const response = await nexiosInstance.get("/post/posts", {
      cache: "no-store",
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
