/* eslint-disable prettier/prettier */
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/services/newsFeedService/newsFeed.Service";

export const useInfinitePost = (category: string[], textual: string) => {
  return useInfiniteQuery({
    queryKey: ["GET_POSTS", category, textual],
    queryFn: async ({ pageParam = 0 }) => {
      console.log({ pageParam });
      const response: any = await getAllPosts(category, textual, pageParam, 1);

      // ! here os the response we have both post  and nextId. NextId says if there are any pages left.
      return response?.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log({ lastPage }, "last Page");
      return lastPage?.nextId != null ? lastPage?.nextId : null;
    },
  });
};
