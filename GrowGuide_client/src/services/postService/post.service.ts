"use server";
import { AxiosInstance } from "@/lib/AxiosInstance";
import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

export const addToFav = async (data: any) => {
  try {
    const res = await AxiosInstance.post(
      "/user-management/add-to-favourites",
      data
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addVote = async (data: any) => {
  console.log(data);
  try {
    const res = await AxiosInstance.post("/post/vote", data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const deletePost = async (data: any) => {
  console.log(data);
  try {
    const res = await nexiosInstance.delete(`/post/post-delete?postId=${data}`);

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
