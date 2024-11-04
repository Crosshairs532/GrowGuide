/* eslint-disable prettier/prettier */
import {
  addToFav,
  addVote,
  removeFav,
} from "@/services/postService/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveFav = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (favData: any) => {
      const res = await removeFav(favData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_POSTS"],
      });
      toast.success("Removed From Your Favourite list!");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
};
