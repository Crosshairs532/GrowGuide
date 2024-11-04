/* eslint-disable prettier/prettier */
import { getSingleUserPost } from "@/services/postService/post.service";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleUserPosts = (userId: string) => {
  return useQuery({
    queryKey: ["single_user_post"],
    enabled: userId ? true : false,
    queryFn: async () => {
      const res = await getSingleUserPost(userId);
      console.log(res, "jbskjbkasbkaksbb");
      return res;
    },
  });
};
