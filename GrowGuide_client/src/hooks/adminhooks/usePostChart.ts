/* eslint-disable prettier/prettier */
"use client";

import { postChart } from "@/services/postService/post.service";
import { useQuery } from "@tanstack/react-query";

export const usePostChart = () => {
  return useQuery({
    queryKey: ["postChart", "GET_POSTS"],
    queryFn: async () => {
      const res = await postChart();
      return res.data;
    },
  });
};
