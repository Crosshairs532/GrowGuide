/* eslint-disable prettier/prettier */
import { profileUpdate } from "@/services/authService/auth.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update_profile"],
    mutationFn: async (data: any) => {
      const res = await profileUpdate(data);

      console.log(res, "profile updated");
      return res.data;
    },
    onSuccess: (data, variables) => {
      const { accessToken, ...other } = data;

      queryClient.setQueryData(
        ["MY_POSTS", "LIKES", "FOLLOWERS", "FOLLOWING", "AUTH"],
        { ...other }
      );

      console.log({ data, variables });
      toast.success("Profile Updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
