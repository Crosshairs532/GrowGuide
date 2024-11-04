/* eslint-disable prettier/prettier */
import { addToFav, addVote } from "@/services/postService/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToFav = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (favData: any) => {
      const res = await addToFav(favData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_POSTS"],
      });
      toast.success("added To Your Favourite Posts");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
};

export const useVote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (voteData: any) => {
      console.log(voteData);
      const res = await addVote(voteData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_POSTS"],
      });
      toast.success("Your Voted added Successfully");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
};
