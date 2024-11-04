"use client";
import React, { useEffect, useState } from "react";
import { useGetAllPosts } from "@/hooks/useGetAllPosts";
import ImageGalleryPost from "./_components/ImageGallery";
import { Divider } from "@nextui-org/react";

// const ImageGallery = () => {
//   const { isFetching, isLoading, isPending, data, isError, refetch } =
//     useGetAllPosts([""], "", 0);

//   if (!data) {
//     return (
//       <p className=" flex justify-center items-center h-[50%]">loading...</p>
//     );
//   }

//   if (isPending || isFetching || isLoading) {
//     return (
//       <p className=" flex justify-center items-center h-[50%]">loading...</p>
//     );
//   }

//   if (isError) {
//     return <p>Something went Wrong!</p>;
//   }

//   console.log(data.data);

//   return (
//     <>
//       <div className=" px-4 py-2">
//         <h1 className=" text-center font-chirpBold text-[5vw]">
//           GrowGuide Gallery
//         </h1>
//         <Divider className=" my-3" />
//         <div className=" px-4 rounded-xl py-2 h-full min-h-screen bg-[#2f33366f]">
//           {data?.data?.map((post: any, index: number) => {
//             return (
//               <ImageGalleryPost
//                 key={index}
//                 images={post?.images}
//               ></ImageGalleryPost>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ImageGallery;

const ImageGallery = () => {
  const { isFetching, isLoading, isPending, data, isError } = useGetAllPosts(
    [""],
    "",
    0
  );

  // Load only on client-side
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading indicator
  }

  if (!data) {
    return (
      <p className="flex justify-center items-center h-[50%]">loading...</p>
    );
  }

  if (isPending || isFetching || isLoading) {
    return (
      <p className="flex justify-center items-center h-[50%]">loading...</p>
    );
  }

  if (isError) {
    return <p>Something went Wrong!</p>;
  }

  console.log(data.data);

  return (
    <>
      <div className="px-4 py-2">
        <h1 className="text-center font-chirpBold text-[5vw]">
          GrowGuide Gallery
        </h1>
        <Divider className="my-3" />
        <div className="px-4 rounded-xl py-2 h-full min-h-screen bg-[#2f33366f]">
          {data?.data?.map((post: any, index: number) => {
            return <ImageGalleryPost key={index} images={post?.images} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
