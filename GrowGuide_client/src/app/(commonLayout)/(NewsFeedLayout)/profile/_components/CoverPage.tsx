/* eslint-disable prettier/prettier */
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import EditProfileModal from "./EditProfileModal";
import { useFollowuser } from "@/hooks/useFollowuser";
import { Star } from "lucide-react";

const CoverPage = ({ CurrentUser, data, refetch }: any) => {
  const { mutate: followUser } = useFollowuser();

  const handleFollow = (followedUser: any) => {
    const followedId = followedUser?._id;
    const myId = CurrentUser?._id;
    const followData = { followedId, myId };
    followUser(followData as any);
    refetch();
  };

  return (
    <>
      <div className="relative group/cover">
        <img
          src={`${data?.image}`}
          className="h-52 w-full object-cover"
          alt="cover"
        />

        {/* <input
        type="file"
        hidden
        accept="image/*"
        ref={coverImgRef}
        onChange={(e) => handleImgChange(e, "coverImg")} */}
      </div>
      <div className="  h-fit avatar px-5 leading-none relative flex justify-between items-center">
        <div className="  relative leading-none w-[130px] h-[130px] flex justify-center items-center rounded-full group/avatar">
          <Avatar className=" w-full h-full" src={`${data?.image}`} />
          {data?.status === "Premium" ? (
            <Star className=" absolute -right-[5] bottom-0" color="#1C9BEF" />
          ) : (
            ""
          )}
        </div>
        {CurrentUser?.email === data?.email ? (
          <EditProfileModal CurrentUser={CurrentUser}></EditProfileModal>
        ) : (
          <Button
            onClick={() => handleFollow(data)}
            isDisabled={!data}
            className=" relative font-chirpMedium rounded-full right-5 text-[15px] border border-[#536371] bg-transparent hover:bg-[#181919]"
          >
            Follow
          </Button>
        )}
      </div>
    </>
  );
};

export default CoverPage;
