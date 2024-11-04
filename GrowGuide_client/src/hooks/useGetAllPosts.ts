/* eslint-disable prettier/prettier */
import { getAllPosts } from "@/services/newsFeedService/newsFeed.Service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = (
  category: string[],
  textual: string,
  limit: number
) => {
  return useQuery({
    queryKey: ["GET_POSTS", category, textual],
    queryFn: async () => {
      const res: any = await getAllPosts(category, textual, 0, limit);
      // console.log(res);
      return res?.data;
    },
  });
};
