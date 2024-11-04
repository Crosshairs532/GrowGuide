/* eslint-disable prettier/prettier */
"use server";
import AxiosInstance from "@/lib/AxiosInstance";
import nexiosInstance from "@/lib/nexiosConfig/nexios.config";
import { revalidateTag } from "next/cache";

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

export const removeFav = async (data: any) => {
  try {
    const res = await AxiosInstance.post(
      "/user-management/remove-favourites",
      data
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addVote = async (data: any) => {
  try {
    const res = await AxiosInstance.patch("/post/vote", data);
    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const deletePost = async (data: any) => {
  console.log(data, "delete if ");
  try {
    const res = await nexiosInstance.delete(`/post/post-delete?postId=${data}`);
    return res.data;
  } catch (error: any) {
    console.log(error.data, "post delelte error");
    throw new Error(error?.response?.data?.message);
  }
};
export const updatePost = async (postData: any) => {
  console.log(postData, "axios");
  // `/post/post-update?postId="67092a38f05a7eb41adabdc6"&userId=67063aa0b940a61d10e0b16b`,

  try {
    const res = await AxiosInstance.patch(`/post/post-update`, postData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postComment = async (commentData: any) => {
  const res: any = await nexiosInstance.put(
    "/post/create-comment",
    commentData
  );

  revalidateTag("post");

  return res?.data?.data;
};

export const commentUpdate = async (commentData: any) => {
  const res = await AxiosInstance.put(`/post/comments`, commentData);
  return res.data;
};

export const createPost = async (postData: any) => {
  console.log(postData);
  const res = await AxiosInstance.post("/post/create-post", postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  revalidateTag("post");
  return res?.data;
};

export const getSingleUserPost = async (userId: string) => {
  const res = await nexiosInstance.get(`/post/get-user-posts?userId=${userId}`);
  return res?.data;
};

export const postChart = async () => {
  const res = await AxiosInstance.get("/post/posts-charts");
  return res.data;
};
