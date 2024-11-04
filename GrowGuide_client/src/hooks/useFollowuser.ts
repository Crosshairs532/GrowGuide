/* eslint-disable prettier/prettier */
import { followUser } from "@/services/authService/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFollowuser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["follow_user"],
    mutationFn: async (data) => {
      const res = await followUser(data);
      return res?.data;
    },
    onSuccess: (data, variables) => {
      const { followedId, myId } = variables as any;
      console.log(data);

      queryClient.setQueryData(["current_user"], (oldData: any) => {
        if (!oldData) return; // Ensure oldData exists before updating
        return {
          ...oldData,
          following: [...oldData.following, followedId], // Append the followed user's ID to the following list
        };
      });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["current_user"] });
      queryClient.invalidateQueries({
        queryKey: ["MY_POSTS", "LIKES", "FOLLOWERS", "FOLLOWING", "AUTH"],
      });

      toast.success("Successfully followed the user!");
    },
    onError: () => {
      toast.error("Something went wrong while following user!!");
    },
  });
};
