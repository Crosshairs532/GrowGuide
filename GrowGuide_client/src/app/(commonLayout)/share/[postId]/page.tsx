import React from "react";
import { getpost } from "../_components/getpost";
import PostGallary from "@/app/UI/post/Postgallary";
import parse from "html-react-parser";
import GeneratePdfButton from "../_components/GeneratePdfButton";

// https://grow-guide-server.vercel.app/

// https://grow-guide-server.vercel.app
export async function generateStaticParams() {
  const products = await fetch(
    "https://grow-guide-server.vercel.app/api/growGuide/post/posts"
  ).then((res) => res.json());
  return products?.data?.data?.map((product: any) => ({
    postId: product?._id,
  }));
}

const SinglePostDetailsPage = async ({
  params,
}: {
  params: { postId: string };
}) => {
  const { postId } = params;
  const post = await getpost(postId);

  if (!post) {
    return (
      <div className="min-h-screen my-[4vh] py-10vh px-4">
        <h1 className="text-[5vw] sm:text-[2.5vw] font-chirpBold">
          Post not found
        </h1>
      </div>
    );
  }

  return (
    <div className=" min-h-screen my-[4vh] py-10vh px-4">
      <div>
        <h1 className=" text-[5vw] sm:text-[2.5vw] font-chirpBold ">
          Description:
        </h1>
        <div>{parse(post?.description)}</div>
      </div>
      <div className=" my-2">
        <h1 className=" text-[5vw] sm:text-[2.5vw] font-chirpBold ">
          Categories:
        </h1>
        <div className="  flex gap-3">
          {post?.categories?.map((category: string, idx: number) => (
            <small key={idx} className=" font-chirpMedium">
              {category}
            </small>
          ))}
        </div>
      </div>
      <div className="images h-[50vh] pb-3 relative grid grid-cols-2 w-[100%] overflow-hidden rounded-2xl">
        <PostGallary images={post?.images} />
      </div>

      <div className=" float-end mt-3 gap-2 flex items-center">
        <GeneratePdfButton post={post} />
      </div>
    </div>
  );
};

export default SinglePostDetailsPage;
