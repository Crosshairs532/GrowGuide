/* eslint-disable prettier/prettier */
"use client";
import { queryClient } from "@/lib/providers";

import { createPost, updatePost } from "@/services/postService/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["CREATE_POST", "GET_POSTS"],
    mutationFn: async (postData: any) => {
      console.log(postData.get("data"));
      console.log(postData.get("file"));
      const res: any = await createPost(postData);
      // console.log(res);
      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
