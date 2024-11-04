/* eslint-disable prettier/prettier */
import { updatePost } from "@/services/postService/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["GET_POSTS"],
    mutationFn: async (postData: any) => {
      console.log(postData, 'usePostDatata,ablg bakg balkhb"');
      const res = await updatePost(postData);
      return res.data;
    },
    onSuccess: (data, variables, context) => {
      // toast.success("Post updated successfully!");
      // queryClient.setQueryData(["GET_POSTS"], (oldData: any) => {
      //   return { ...oldData, ...data };
      // });
      queryClient.invalidateQueries({
        queryKey: ["GET_POSTS"],
      });

      toast.success("Post Edited successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
