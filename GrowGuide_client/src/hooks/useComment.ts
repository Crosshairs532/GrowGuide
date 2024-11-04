import { queryClient } from "@/lib/providers";
/* eslint-disable prettier/prettier */

import { postComment } from "@/services/postService/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["POST_COMMENT", "GET_POSTS"],
    mutationFn: async (commentData: any) => {
      const res = await postComment(commentData);
      return res;
    },
    onMutate: async (newTodo) => {
      console.log(newTodo);
      // await queryClient.cancelQueries({ queryKey: ["todos", newTodo.id] });
      // const previousTodo = queryClient.getQueryData(["todos", newTodo.id]);
      // queryClient.setQueryData(["todos", newTodo.id], newTodo);
      // return { previousTodo, newTodo };
    },

    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["GET_POSTS"] });
    },
  });
};
