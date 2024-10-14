"use client";
import React from "react";
import { useGetAllPosts } from "@/hooks/useGetAllPosts";
import PostCard from "../../UI/post/PostCard";
import ImageGalleryCard from "./_components/ImageGalleryCard";
import PostGallary from "@/app/UI/post/Postgallary";
import ImageGalleryPost from "./_components/ImageGallery";
import { Divider } from "@nextui-org/react";

const ImageGallery = () => {
  const { isFetching, isLoading, isPending, data, isError, refetch } =
    useGetAllPosts();

  if (isPending || isFetching || isLoading) {
    return (
      <p className=" flex justify-center items-center h-[50%]">loading...</p>
    );
  }

  if (isError) {
    return <p>Something went Wrong!</p>;
  }

  console.log(data);

  return (
    <>
      <div className=" px-4 py-2">
        <h1 className=" text-center font-chirpBold text-[5vw]">
          GrowGuide Gallery
        </h1>
        <Divider className=" my-3" />
        <div className=" px-4 rounded-xl py-2 h-full min-h-screen bg-[#2f33366f]">
          {data?.map((post: any, index: number) => {
            //   return <ImageGalleryCard post={post} key={index}></ImageGalleryCard>;
            return <ImageGalleryPost images={post?.images}></ImageGalleryPost>;
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
