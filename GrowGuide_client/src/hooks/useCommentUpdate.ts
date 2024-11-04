/* eslint-disable prettier/prettier */
import { commentUpdate } from "@/services/postService/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCommentUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["POST_COMMENT_EDIT_DELETE"],
    mutationFn: async (commentData: any) => {
      const res = await commentUpdate(commentData);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_POSTS"],
      });
    },
  });
};
