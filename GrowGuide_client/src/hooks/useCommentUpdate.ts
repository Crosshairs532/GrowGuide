import { commentUpdate } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";

export const useCommentUpdate = () => {
  return useMutation({
    mutationKey: ["POST_COMMENT_EDIT_DELETE"],
    mutationFn: async (commentData: any) => {
      const res = await commentUpdate(commentData);
      return res;
    },
  });
};
