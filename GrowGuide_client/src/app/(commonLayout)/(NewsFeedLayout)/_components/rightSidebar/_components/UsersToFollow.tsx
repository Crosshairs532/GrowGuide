"use client";
import { useGrowContext } from "@/app/Context/GrowContext";
import { useGetTabData } from "@/hooks/getTabData";
import { useFollowuser } from "@/hooks/useFollowuser";
import { useGetAllusers } from "@/hooks/useGetAllUsers";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { Avatar, Button, Skeleton, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UsersToFollow = () => {
  const [clicked, setClicked] = useState();
  const {
    data,
    isPending,
    isSuccess,
    isFetching,
    refetch: refetchAllUser,
  } = useGetAllusers();
  const { user, loading } = useGrowContext();

  const {
    data: LoggedInUser,
    isPending: userPending,
    refetch,
  } = useCurrentUser(user?._id, loading);
  const router = useRouter();
  const {
    mutate: followUser,
    isPending: followPending,
    isSuccess: followSuccess,
  } = useFollowuser();

  const handleProfile = (selectedUser: any) => {
    router.push(`/profile/${selectedUser?._id}`);
  };

  const handleFollow = (followedUser: any) => {
    if (!user) {
      return toast.warning("You are not logged in!");
    }
    console.log("clikc");
    console.log({ LoggedInUser, user });
    const followedId = followedUser?._id;
    const myId = user?._id;
    const followData = { followedId, myId };
    followUser(followData as any);

    //! this code was commented for checking . id follow user does not get updated then uncomment it .
    // refetchAllUser();
    // refetch();
  };
  const notFollowed = data?.filter(
    (singleUser: any) =>
      singleUser?.email != user?.email &&
      !LoggedInUser?.following
        .map((followinguser: any) => followinguser._id)
        .includes(singleUser?._id)
  );

  console.log({ LoggedInUser, user, data, notFollowed });

  return (
    <div className=" grid grid-cols-1">
      {notFollowed?.map((user: any, index: any) => (
        <div key={index} className=" flex items-center justify-between ">
          <div className="  w-full flex justify-between gap-2 items-center">
            <Tooltip
              placement="top"
              content={
                <div className=" flex flex-col">
                  <p className=" text-ellipsis leading-none text-nowrap font-chirpRegular text-[1.5vw]">
                    {user?.name}
                  </p>
                  <p className=" leading-none text-wrap">{user?.email}</p>
                </div>
              }
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => handleProfile(user)}
                className="  gap-2 overflow-x-hidden flex-1 flex"
              >
                <Skeleton
                  isLoaded={!isPending}
                  className="flex rounded-full w-12 h-12"
                >
                  <Avatar src={`${user?.image}`}></Avatar>
                </Skeleton>
                <div className=" w-full h-auto flex flex-col gap-2">
                  <Skeleton
                    isLoaded={!isPending}
                    className="h-3 w-3/5 rounded-lg"
                  >
                    <p className=" text-ellipsis leading-none text-nowrap text-[1.5vw]">
                      {user?.name}
                    </p>
                  </Skeleton>
                  <Skeleton
                    isLoaded={!isPending}
                    className=" h-3  w-4/5 rounded-lg"
                  >
                    <p className=" leading-none text-wrap">{user?.email}</p>
                  </Skeleton>
                </div>
              </div>
            </Tooltip>
            <Skeleton
              // className=" w-[15%]"
              isLoaded={!isPending}
            >
              {followPending ? (
                "Following..."
              ) : (
                <Button
                  key={index}
                  onClick={() => {
                    handleFollow(user);
                    setClicked(user?._id);
                  }}
                >
                  Follow
                </Button>
              )}
            </Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersToFollow;
