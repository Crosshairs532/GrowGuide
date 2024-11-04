"use client";
import React, { useEffect } from "react";
import { useGetAllPosts } from "@/hooks/useGetAllPosts";
import PostCard from "../../UI/post/PostCard";
import { useNewFeedContext } from "./layout";
import { useInfinitePost } from "@/hooks/useInfinitePost";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { useGrowContext } from "@/app/Context/GrowContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const NewsFeed = () => {
  const { ref, inView } = useInView();
  const { user, loading } = useGrowContext();
  const { category, textual } = useNewFeedContext();

  const {
    status,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfinitePost(category, textual);

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  console.log(data, "news feed");
  return (
    <div className="">
      {status === "pending" ? (
        <p className=" text-[#ffffff] w-full h-[20vh] flex justify-center items-center">
          Loading...
        </p>
      ) : status === "error" ? (
        <span>Error: {error?.message}</span>
      ) : (
        <div className="">
          {data?.pages.map((page, index: number) =>
            page?.data?.map((post: any, idx: number) => (
              <PostCard refetch={refetch} key={idx} post={post} />
            ))
          )}
          <div className=" flex justify-center items-center ">
            <button
              className=" text-[#ffffff]"
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                  ? "Load more"
                  : "No post to load"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
