"use client";
import React, { Suspense } from "react";

import { useGetAllPosts } from "@/hooks/useGetAllPosts";
import PostCard from "../UI/post/PostCard";

const NewsFeed = () => {
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
      {data?.map((post: any, index: number) => {
        return <PostCard post={post} key={index}></PostCard>;
      })}
    </>
  );
};

export default NewsFeed;
