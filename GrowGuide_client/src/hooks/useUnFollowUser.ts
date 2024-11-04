/* eslint-disable prettier/prettier */
import { unfollowUser } from "@/services/authService/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUnFollowUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["un_follow_user"],
    mutationFn: async (data) => {
      const res = await unfollowUser(data);
      return res?.data;
    },
    onSuccess: (data, variables) => {
      const { followedId, myId } = variables as any;
      console.log(data);

      //   queryClient.setQueryData(["current_user"], (oldData: any) => {
      //     if (!oldData) return; // Ensure oldData exists before updating
      //     return {
      //       ...oldData,
      //       following: [...oldData.following, followedId], // Append the followed user's ID to the following list
      //     };
      //   });

      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["current_user"] });
      queryClient.invalidateQueries({
        queryKey: ["MY_POSTS", "LIKES", "FOLLOWERS", "FOLLOWING", "AUTH"],
      });

      toast.success("Successfully un-followed the user!");
    },
    onError: () => {
      toast.error("Something went wrong while un-following user!!");
    },
  });
};
