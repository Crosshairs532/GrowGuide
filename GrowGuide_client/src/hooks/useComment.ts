import { queryClient } from "@/lib/providers";
import { postComment } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useComment = () => {
  return useMutation({
    mutationKey: ["POST_COMMENT"],
    mutationFn: async (commentData: any) => {
      //   console.log(commentData);
      const res = await postComment(commentData);
      return res;
    },
    // onMutate: async (updatedPost) => {
    //   console.log(updatedPost);
    //   await queryClient.cancelQueries({ queryKey: ["GET_POSTS"] }); // Cancel any outgoing queries

    //   const previousPosts = queryClient.getQueryData(["GET_POSTS"]); // Get current posts

    //   console.log(previousPosts);
    //   // Optimistically update the specific post in the cache
    //   queryClient.setQueryData(["GET_POSTS"], (oldPosts: any) =>
    //     oldPosts.map((post) =>
    //       post._id === updatedPost._id ? { ...post, ...updatedPost } : post
    //     )
    //   );

    //   return { previousPosts }; // Return context for rollback
    // },
  });
};
