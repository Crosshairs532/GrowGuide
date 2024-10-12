import { createPost, updatePost } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCreate = () => {
  return useMutation({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData: any) => {
      console.log(postData.get("data"));
      console.log(postData.get("file"));
      const res = await createPost(postData);
      return res?.data;
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
