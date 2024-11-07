import { useGetSingleUserPosts } from "@/hooks/useGetSingleUserPosts";
import React from "react";
import PostSkeleton from "./PostSkeleton";
import PostCard from "@/app/UI/post/PostCard";

const UserPosts = ({ CurrentUser }: any) => {
  const userId = CurrentUser;

  console.log(userId);
  const { data, isPending, refetch } = useGetSingleUserPosts(userId);

  return (
    <div>
      {isPending ? (
        <PostSkeleton />
      ) : (data as any)?.data?.length > 0 ? (
        (data as any)?.data?.map((post: any, index: number) => (
          <PostCard key={index} refetch={refetch} post={post} />
        ))
      ) : (
        <h1 className=" text-[#ECEDEE]">No posts to show!</h1>
      )}
    </div>
  );
};

export default UserPosts;
