import { updatePost } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostUpdate = () => {
  return useMutation({
    mutationKey: ["GET_POSTS"],
    mutationFn: async (postData: any) => {
      console.log(postData, 'usePostDatata,ablg bakg balkhb"');
      const res = await updatePost(postData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post updated successfully!");
      //   queryClient.invalidateQueries({
      //     queryKey: ["GET_POSTS"],
      //   });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
