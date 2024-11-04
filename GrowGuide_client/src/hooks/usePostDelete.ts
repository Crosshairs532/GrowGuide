/* eslint-disable prettier/prettier */
import { queryClient } from "@/lib/providers";
import { deletePost } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

export const usePostDelete = () => {
  return useMutation({
    mutationKey: ["GET_POSTS"],
    mutationFn: async (postId) => {
      console.log(postId);
      const res: any = await deletePost(postId);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post Deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["GET_POSTS"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
