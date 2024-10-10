import { queryClient } from "@/lib/providers";
import { deletePost } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

export const usePostDelete = () => {
  return useMutation({
    mutationFn: async (postId) => {
      console.log(postId);
      const res = await deletePost(postId);
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
