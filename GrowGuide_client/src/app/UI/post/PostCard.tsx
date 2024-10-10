"use client";
import { Avatar, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Bookmark,
  ChartNoAxesGantt,
  Ellipsis,
  Heart,
  MessageCircle,
  Share,
  Vote,
} from "lucide-react";

import PostGallary from "./Postgallary";
import { useAddToFav, useVote } from "@/hooks/useAddToFav";
import getUser from "@/hooks/getUser";
import { JwtPayload } from "jwt-decode";
import { useGrowContext } from "@/app/Context/GrowContext";
import DropDown from "../dropDown/DropDown";

const PostCard = ({ post }: { post: any }) => {
  const { mutate: addToFav } = useAddToFav();
  const { mutate: addVote } = useVote();
  const [vote, setVote] = useState<Boolean>();
  const user = useGrowContext();

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

  return (
    <div className="  px-4">
      <div className=" relative post-header w-full bg-red-500 min-h-[60vh] flex gap-3 ">
        <div className=" avatar ">
          <Avatar
            isBordered
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </div>
        <div className=" border-2 user_name description date space-y-3 flex flex-col">
          <div className=" userName_Data flex gap-2 justify-between items-center">
            <div className=" flex gap-2">
              <p className=" leading-none">Tanzim</p>
              <small>oct , 5</small>
            </div>

            <span className=" rounded-full duration-250 flex justify-center items-center group hover:bg-[#0D1720] cursor-pointer">
              <DropDown>
                <Ellipsis className=" group-hover:text-[#1C9BEF]" />
              </DropDown>
            </span>
          </div>
          <div className=" description_ categories">
            <div className=" description">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
              nisi porro suscipit rerum distinctio repellat iste, provident vel
              quisquam accusantium, odio consequatur ipsum, asperiores veniam.
              Cum quis error molestiae eveniet.
            </div>
            <div className=" categories">
              <p>#categories</p>
            </div>
          </div>
          <div className="images border-2 relative grid grid-cols-2 h-full w-[100%] overflow-hidden   rounded-2xl">
            <PostGallary />
          </div>
          <div className=" mt-2 user_interaction flex justify-between">
            <MessageCircle />
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
                className=" group flex items-center cursor-pointer hover:text-[#1C9BEF] duration-250"
              >
                <ArrowUpNarrowWide className=" group-hover:bg-[#0D1720] rounded-full " />
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
                className=" group flex items-center cursor-pointer hover:text-[#ef1c1ccf] duration-250"
              >
                <ArrowDownWideNarrow className=" group-hover:bg-[#0D1720] rounded-full " />
              </span>
            </Tooltip>

            <span
              onClick={() => handleAddToFav(post?._id)}
              className=" group duration-250 cursor-pointer hover:bg-[#F9197F]"
            >
              <Tooltip
                content="Add To Favoutites"
                classNames={{
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-[#F9197F] bg-gradient-to-br from-bg-[#F9197F] to-neutral-400",
                  ],
                }}
              >
                <Heart className=" group-hover:bg-[#210C14] rounded-full" />
              </Tooltip>
            </span>
            <div className=" flex gap-2">
              <Bookmark />
              <Share />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
