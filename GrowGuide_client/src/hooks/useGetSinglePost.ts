/* eslint-disable prettier/prettier */
"use server";
import AxiosInstance from "@/lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetSinglePost = (postId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["singlePost"],
    queryFn: async () => {
      const res = AxiosInstance.get(`/posts/${postId}`);
    },
  });
};
