"use client";

import PostGallary from "@/app/UI/post/Postgallary";
import { Divider } from "@nextui-org/react";
import ImageGalleryPost from "./ImageGallery";

const ImageGalleryCard = ({ post }: { post: any }) => {
  return (
    <>
      {/* <div className=" relative py-8 px-4"> */}
      {/* <div className="  bg-[#242526] p-2 rounded-2xl relative post-header w-full border-2 flex gap-3 "> */}
      {/* <div className="images border-2 border-x-red-500 relative flex h-full w-[100%] overflow-hidden rounded-2xl"> */}
      <ImageGalleryPost images={post?.images} />
      {/* </div> */}
      {/* </div> */}
      {/* //   </div> */}
    </>
  );
};

export default ImageGalleryCard;
