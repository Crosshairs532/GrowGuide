import { useGetAllPosts } from "@/services/newsFeedService/newsFeed.Service";
import React from "react";
import PostCard from "../UI/post/PostCard";

const NewsFeed = async () => {
  const allPostData: any = await useGetAllPosts();

  console.log(allPostData.data, "helooo");
  return (
    <>
      <div className="">News Feed - {allPostData.data.length}</div>;
      {/* {allPostData?.data?.map((post: any, index: number) => {
        <PostCard post={post} key={index}></PostCard>;
      })} */}
      {<PostCard post="" key={1}></PostCard>}
    </>
  );
};

export default NewsFeed;
