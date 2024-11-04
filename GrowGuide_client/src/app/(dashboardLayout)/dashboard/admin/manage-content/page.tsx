/* eslint-disable prettier/prettier */
"use client";
import PostCardAdmin from "@/app/(dashboardLayout)/_components/PostCardAdmin";
import LoadingOverlay from "@/app/UI/LoadingOverlay";
import { useGetAllPosts } from "@/hooks/useGetAllPosts";
import React from "react";

const ManageContent = () => {
  const { isFetching, isLoading, isPending, data, isError, refetch } =
    useGetAllPosts([""], "", 0);

  if (!data) {
    return (
      <p className=" flex justify-center items-center h-[50%]">loading...</p>
    );
  }

  if (isPending || isFetching || isLoading) {
    return (
      <p className=" flex justify-center items-center h-[50%]">loading...</p>
    );
  }

  if (isError) {
    return <p>Something went Wrong!</p>;
  }

  return (
    <div className=" h-screen ">
      {isPending && <LoadingOverlay isPending={isPending}></LoadingOverlay>}
      <div>
        {data?.data.length > 0 ? (
          data?.data?.map((post: any, index: number) => (
            <PostCardAdmin key={index} post={post}></PostCardAdmin>
          ))
        ) : (
          <h1 className=" text-center text-2xl sm:text-5xl font-chirpBold text-white ">
            No Content To show!
          </h1>
        )}
      </div>
    </div>
  );
};

export default ManageContent;
