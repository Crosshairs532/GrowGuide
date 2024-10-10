"use client";
import { Avatar } from "@nextui-org/react";
import React from "react";

import { Bookmark, Heart, MessageCircle, Share, Vote } from "lucide-react";
import Image from "next/image";
import PostGallary from "./Postgallary";

const PostCard = ({ post }: { post: any }) => {
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
            <p> ... </p>
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
            <Vote />
            <Heart />
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
