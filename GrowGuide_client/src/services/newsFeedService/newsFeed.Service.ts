/* eslint-disable prettier/prettier */
"use server";

import nexiosInstance from "@/lib/nexiosConfig/nexios.config";

export const getAllPosts = async (
  category: string[],
  textual: string,
  nextId: number,
  limit: any
) => {
  console.log(nextId);
  try {
    const response = await nexiosInstance.get(
      `/post/posts?category=${category?.join("-")}&other=${textual}&nextId=${Number(nextId)}&limit=${limit}`,
      {
        cache: "no-store",
        next: {
          tags: ["post"],
        },
      }
    );

    //! {data:response.data, nextId:response.nextId} this is from database. So next Id says How may pages i have skipped till now.
    // !if 0 no pages skipped
    // !if 1 , 1 pages skipped
    // !if 2 , 2 pages skipped

    return response?.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const allPostGallery = async () => {
  try {
    const res = await nexiosInstance.get("/post/posts", {
      cache: "no-store",
    });
    console.log(res, "res");
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
