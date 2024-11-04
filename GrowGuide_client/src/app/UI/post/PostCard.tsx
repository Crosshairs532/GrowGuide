/* eslint-disable prettier/prettier */
"use client";
import {
  Avatar,
  Button,
  Divider,
  Link,
  Tooltip,
  User,
} from "@nextui-org/react";
import React, { useState } from "react";
import parse from "html-react-parser";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Bookmark,
  Download,
  Ellipsis,
  Forward,
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
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePathname, useRouter } from "next/navigation";
import { useRemoveFav } from "@/hooks/useRemoveFav";

const PostCard = ({ post, refetch }: { post: any; refetch: any }) => {
  const { mutate: addToFav } = useAddToFav();
  const { mutate: removeFav } = useRemoveFav();
  const { mutate: addVote } = useVote();
  const [vote, setVote] = useState<Boolean>();
  const [isComment, setIsComment] = useState<boolean>(false);
  const { user, loading } = useGrowContext();
  const { data: currentUser } = useCurrentUser(user?._id, loading);
  const [copyUrl, setCopyUrl] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const isFavourite = post?.favourite.find(
    (userId: string) => userId === currentUser?._id
  );
  const handleAddToFav = (postId: string) => {
    if (!user) {
      return toast.error("You Have to Login first");
    }

    const favData = { email: user?.email, postId: postId, userId: user?._id };
    console.log({ isFavourite });
    if (isFavourite) {
      removeFav(favData);
    } else {
      addToFav(favData);
    }
  };

  const handleUpVote = (postId: string) => {
    console.log(postId);
    if (!user) {
      return toast.error("You Have to Login first");
    }

    if (currentUser?._id === post?.user?._id) {
      return toast.error("You can't vote for your own post");
    }

    addVote({
      postId: postId,
      userId: user?._id,
      vote: 1,
    });

    refetch();
  };
  const handleDownVote = (postId: string) => {
    if (!user) {
      return toast.error("You Have to Login first");
    }
    if (currentUser?._id === post?.user?._id) {
      return toast.error("You can't vote for your own post");
    }
    addVote({
      postId: postId,
      vote: -1,
    });
  };

  const handleComment = (value: boolean) => {
    if (!user) {
      return toast.error("You Have to Login first");
    }
    setIsComment(value);
  };

  const handleNavigation = () => {
    console.log("user");
    if (!user) {
      return toast.warning("you are not logged in!");
    }
    router.push("/premium");
  };

  const handleCopy = async () => {
    console.log(`${window.location.origin}/share/${post?._id}`);

    try {
      await navigator.clipboard.writeText(
        `${window?.location?.origin}/share/${post?._id}`
      );
    } catch (err: any) {
      console.error(err.message);
    }
    toast.success("post to clipboard");
  };

  // console.log(currentUser?._id, post?.user._id);
  let Day;

  const [day, month, year] = new Date(post?.createdAt)
    .toLocaleDateString()
    .split("/");

  switch (month) {
    case "1":
      Day = "Jan";
      break;
    case "2":
      Day = "Feb";
      break;
    case "3":
      Day = "March";
      break;
    case "4":
      Day = "April";
      break;
    case "5":
      Day = "May";
      break;
    case "6":
      Day = "June";
      break;
    case "7":
      Day = "July";
      break;
    case "8":
      Day = "August";
      break;
    case "9":
      Day = "Sep.";
      break;
    case "10":
      Day = "Oct";
      break;
    case "11":
      Day = "Nov";
      break;
    case "12":
      Day = "Dec";
      break;
  }

  return (
    <>
      <div className=" relative py-8 px-4">
        <div className="  bg-[#242526] px-3 py-2 rounded-2xl relative post-header w-full min-h-[60vh] flex gap-3 ">
          <div
            className={`${post?.premium ? (currentUser?._id !== post?.user?._id ? (currentUser?.status === "Premium" ? "hidden" : "block") : "hidden") : "hidden"} flex justify-center items-center absolute w-full h-full top-0 inset-0 bg-black/30  backdrop-blur-md z-20`}
          >
            {/* <Link href="/premium"> */}
            <Button onClick={handleNavigation} className=" font-chirpBold">
              Upgrade To Premium
            </Button>
            {/* </Link> */}
          </div>
          <div className=" avatar ">
            <Avatar isBordered size="md" src={post?.user?.image} />
          </div>
          <div className="    w-[84%] sm:w-full user_name description date  flex flex-col">
            <div className=" userName_Data flex gap-2 justify-between items-center">
              <div className=" leading-none flex-initial flex gap-2">
                <p className="leading-none">{post?.user?.name}</p>
                <small>
                  {Day},{day}
                </small>
              </div>

              <span className=" rounded-full duration-250 flex justify-center items-center group hover:bg-[#0D1720] cursor-pointer">
                <DropDown post={post}>
                  <Ellipsis className=" group-hover:text-[#1C9BEF]" />
                </DropDown>
              </span>
            </div>
            <div className=" description_categories">
              <p className="   word-break relative description text-wrap">
                {parse(post?.description)}
              </p>
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
            <div className="images relative  h-full overflow-hidden border-2 rounded-2xl">
              <PostGallary images={post?.images} />
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
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    handleComment(true);
                  }}
                  className=" duration-250 hover:bg-[#00ba7c1e] cursor-pointer flex items-center group justify-center w-[5vh] h-[5vh] rounded-full"
                >
                  <MessageCircle className=" group-hover:text-[#00BA7C] text-[#71767A] " />{" "}
                  {post?.comments?.length}
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
                  role="button"
                  tabIndex={0}
                  onClick={() => handleUpVote(post?._id)}
                  className=" gap-1 justify-center w-[5vh] h-[5vh] rounded-full  hover:bg-[#0D1720]  group flex items-center cursor-pointer duration-250"
                >
                  <ArrowUpNarrowWide className=" text-[#71767A]  group-hover:text-[#1C9BEF]" />
                  {post?.votes}
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
                  role="button"
                  tabIndex={0}
                  onClick={() => handleDownVote(post._id)}
                  className=" w-[5vh] h-[5vh] rounded-full  group flex justify-center items-center cursor-pointer hover:text-[#ef1c1ccf] hover:bg-[#ef1c1c16] duration-250"
                >
                  <ArrowDownWideNarrow className="  text-[#71767A] group-hover:text-[#ef1c1ccf] " />
                </span>
              </Tooltip>

              <span
                role="button"
                tabIndex={0}
                onClick={() => handleAddToFav(post?._id)}
                className={` ${isFavourite ? "bg-[#f9197e1a] text-[#F9197F]" : null} w-[5vh] h-[5vh] flex justify-center items-center hover:bg-[#f9197e1a] rounded-full group duration-250 cursor-pointer`}
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
                  <Heart
                    className={`${isFavourite ? "text-[#F9197F]" : "text-[#71767A]"} group-hover:text-[#F9197F] group-hover:bg-[#210C14] rounded-full`}
                  />
                </Tooltip>
              </span>
              <Tooltip
                classNames={{
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-[#ef1c1ccf] bg-gradient-to-br from-bg-[#ef1c1ccf] to-neutral-400",
                  ],
                }}
                content="Share"
              >
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleCopy}
                  className=" w-[5vh] h-[5vh] rounded-full  group flex justify-center items-center cursor-pointer hover:text-[#ef1c1ccf] hover:bg-[#ef1c1c16] duration-250"
                >
                  <Forward className="  text-[#71767A] group-hover:text-[#ef1c1ccf] " />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="comment">
          <PostComment isComment={isComment} post={post}></PostComment>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default PostCard;
