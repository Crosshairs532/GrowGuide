/* eslint-disable prettier/prettier */
"use server";

import AxiosInstance from "@/lib/AxiosInstance";

export const useGeneratePdf = async (post: any) => {
  const res = await AxiosInstance.post("/generate/pdf", post);
  // console.log(res);
};
