import { addToFav, addVote } from "@/services/postService/post.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddToFav = () => {
  return useMutation({
    mutationFn: async (favData: any) => {
      const res = await addToFav(favData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("added To Your Favourite Posts");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
};

export const useVote = () => {
  return useMutation({
    mutationFn: async (voteData: any) => {
      const res = await addVote(voteData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Your Voted added Successfully");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });
};
