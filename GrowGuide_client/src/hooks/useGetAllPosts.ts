import { getAllPosts } from "@/services/newsFeedService/newsFeed.Service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["GET_POSTS"],
    queryFn: async () => {
      const res = await getAllPosts();
      return res?.data;
    },
  });
};
