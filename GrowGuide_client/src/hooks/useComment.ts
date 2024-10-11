import { postComment } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";

export const useComment = () => {
  return useMutation({
    mutationKey: ["POST_COMMENT"],
    mutationFn: async (commentData: any) => {
      //   console.log(commentData);
      const res = await postComment(commentData);
      return res.data;
    },
    // onSuccess: () => {
    //   toast.success(`Check Your Email`);
    // },
    // onError: (error: any) => {
    //   console.log(error);
    //   toast.error(error.message);
    // },
  });
};
