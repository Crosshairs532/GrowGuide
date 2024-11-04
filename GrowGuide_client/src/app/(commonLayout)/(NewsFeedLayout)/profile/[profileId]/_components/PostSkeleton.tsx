import { Skeleton } from "@nextui-org/react";
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="relative py-8 px-4">
      <div className="bg-[#242526] p-2 rounded-2xl relative w-full min-h-[60vh] flex gap-3">
        <div className="avatar">
          <Skeleton className=" w-[40px] h-[40px] rounded-full" />
        </div>
        <div className="w-full user_name description date flex flex-col">
          <div className="userName_Data flex gap-2 justify-between items-center">
            <div className="leading-none flex gap-2">
              <Skeleton className=" w-[100px] h-[20px]" />
              <Skeleton className=" w-[60px] h-[15px]" />
            </div>
            <Skeleton className=" w-[30px] h-[30px] rounded-full" />
          </div>
          <div className="description_categories">
            <Skeleton className=" h-[20px]" />
            <Skeleton className=" h-[20px]" />
            <Skeleton className=" h-[20px]" />
          </div>
          <div className="images relative grid grid-cols-2 h-full w-[100%] overflow-hidden rounded-2xl">
            <Skeleton className=" h-[100%]" />
          </div>
          <div className="mt-2 user_interaction flex justify-between">
            <Skeleton className=" w-[30px] h-[30px] rounded-full" />
            <Skeleton className=" w-[30px] h-[30px] rounded-full" />
            <Skeleton className=" w-[30px] h-[30px] rounded-full" />
            <Skeleton className=" w-[30px] h-[30px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
