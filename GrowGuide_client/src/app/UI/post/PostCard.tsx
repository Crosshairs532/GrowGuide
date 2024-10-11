"use client";
import { Avatar, Divider, Link, Tooltip, User } from "@nextui-org/react";
import React, { useState } from "react";
import parse from "html-react-parser";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Bookmark,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";

import PostGallary from "./Postgallary";
import { useAddToFav, useVote } from "@/hooks/useAddToFav";

import { useGrowContext } from "@/app/Context/GrowContext";
import DropDown from "../dropDown/DropDown";
import { usePostDelete } from "@/hooks/usePostDelete";
import PostComment from "./PostComment";
import { json } from "stream/consumers";

const PostCard = ({ post }: { post: any }) => {
  const { mutate: addToFav } = useAddToFav();
  const { mutate: addVote } = useVote();
  const [vote, setVote] = useState<Boolean>();
  const [isComment, setIsComment] = useState<Boolean>();
  const user = useGrowContext();

  console.log(post, "post");
  const handleAddToFav = (postId: string) => {
    const favData = { email: user?.email, postId: postId };
    console.log(favData);
    addToFav(favData);
  };

  const handleUpVote = (postId: string) => {
    addVote({
      postId: postId,
      vote: 1,
    });
  };
  const handleDownVote = (postId: string) => {
    addVote({
      postId: postId,
      vote: -1,
    });
  };

  const handleComment = (value: boolean) => {
    setIsComment(value);
  };

  return (
    <>
      <div className=" py-8 px-4">
        <div className="  bg-[#242526] p-2 rounded-2xl relative post-header w-full min-h-[60vh] flex gap-3 ">
          <div className=" avatar ">
            <Avatar isBordered size="md" src={post.user.image} />
          </div>
          <div className="  w-full user_name description date  flex flex-col">
            <div className=" userName_Data flex gap-2 justify-between items-center">
              <div className=" leading-none flex gap-2">
                <p className="leading-none">{post.user.name}</p>
                <small>oct, 6</small>
              </div>

              <span className=" rounded-full duration-250 flex justify-center items-center group hover:bg-[#0D1720] cursor-pointer">
                <DropDown post={post}>
                  <Ellipsis className=" group-hover:text-[#1C9BEF]" />
                </DropDown>
              </span>
            </div>
            <div className=" description_categories">
              <p className=" description">{parse(post?.description)}</p>
              <div className=" categories pb-5">
                {post.categories?.map((category: string, index: number) => (
                  <Link
                    key={index}
                    href="#"
                    className=" italic"
                    underline="always"
                  >
                    #{category}
                  </Link>
                ))}
              </div>
            </div>
            <div className="images  relative grid grid-cols-2 h-full w-[100%] overflow-hidden   rounded-2xl">
              {/* {post?.images?.map((image: string, index: number) => ( */}
              <PostGallary images={post?.images} />
              {/* ))} */}
            </div>
            <div className=" mt-2 user_interaction flex justify-between">
              <Tooltip
                classNames={{
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-[#00BA7C] bg-gradient-to-br from-bg-[#0D1720] to-neutral-400",
                  ],
                }}
                content="Comments"
              >
                <span
                  onClick={() => {
                    handleComment(true);
                  }}
                  className=" duration-250 hover:bg-[#00ba7c1e] cursor-pointer flex items-center group justify-center w-[5vh] h-[5vh] rounded-full"
                >
                  <MessageCircle className=" group-hover:text-[#00BA7C] text-[#71767A] " />
                </span>
              </Tooltip>
              <Tooltip
                classNames={{
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-[#1C9BEF] bg-gradient-to-br from-bg-[#0D1720] to-neutral-400",
                  ],
                }}
                content="Up Vote"
              >
                <span
                  onClick={() => handleUpVote(post._id)}
                  className=" justify-center w-[5vh] h-[5vh] rounded-full  hover:bg-[#0D1720]  group flex items-center cursor-pointer duration-250"
                >
                  <ArrowUpNarrowWide className=" text-[#71767A]  group-hover:text-[#1C9BEF]" />
                </span>
              </Tooltip>
              <Tooltip
                classNames={{
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-[#ef1c1ccf] bg-gradient-to-br from-bg-[#ef1c1ccf] to-neutral-400",
                  ],
                }}
                content="down Vote"
              >
                <span
                  onClick={() => handleDownVote(post._id)}
                  className=" w-[5vh] h-[5vh] rounded-full  group flex justify-center items-center cursor-pointer hover:text-[#ef1c1ccf] hover:bg-[#ef1c1c16] duration-250"
                >
                  <ArrowDownWideNarrow className="  text-[#71767A] group-hover:text-[#ef1c1ccf] " />
                </span>
              </Tooltip>

              <span
                onClick={() => handleAddToFav(post?._id)}
                className=" w-[5vh] h-[5vh] flex justify-center items-center hover:bg-[#f9197e1a] rounded-full group duration-250 cursor-pointer"
              >
                <Tooltip
                  content="Add To Favoutites"
                  classNames={{
                    content: [
                      "py-2 px-4 shadow-xl",
                      "text-[#F9197F]  bg-gradient-to-br from-bg-[#F9197F] to-neutral-400",
                    ],
                  }}
                >
                  <Heart className=" text-[#71767A] group-hover:text-[#F9197F] group-hover:bg-[#210C14] rounded-full" />
                </Tooltip>
              </span>
              {/* <div className=" flex gap-2">
                <Bookmark color="#71767A" />
                <Share color="#71767A" />
              </div> */}
            </div>
          </div>
          <div className="comment">
            <PostComment post={post}></PostComment>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default PostCard;
