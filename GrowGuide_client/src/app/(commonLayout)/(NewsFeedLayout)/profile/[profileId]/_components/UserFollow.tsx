import { useGrowContext } from "@/app/Context/GrowContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useFollowuser } from "@/hooks/useFollowuser";
import { useGetAllusers } from "@/hooks/useGetAllUsers";
import { useUnFollowUser } from "@/hooks/useUnFollowUser";
import { Avatar, Button, Skeleton, Tooltip } from "@nextui-org/react";
import React from "react";

// * this page will show the list of users the logged in user following.

const UserFollow = ({ data, isPending }: any) => {
  // ! logged in user from token
  const { user, loading } = useGrowContext();
  // ! logged in user from database
  const {
    data: LoggedInUser,
    isPending: userPending,
    refetch,
  } = useCurrentUser(user?._id, loading);

  const { mutate: unfollowUser, isPending: unFollowPending } =
    useUnFollowUser();
  //   const {
  //     data,
  //     isPending,
  //     isSuccess,
  //     isFetching,
  //     refetch: refetchAllUser,
  //   } = useGetAllusers();

  const handleUnFollow = (unfollowUserData: any) => {
    console.log("clikc");
    console.log({ LoggedInUser, user });
    const unfollowId = unfollowUserData?._id;
    const myId = user?._id;
    const unfollowData = { unfollowId, myId };
    unfollowUser(unfollowData as any);

    // refetchAllUser();
    // refetch();
  };

  return (
    <div
      key={data?._id}
      className=" border-b border-[#2F3336] pb-4 flex items-center justify-between "
    >
      {
        <div className="  w-full flex justify-between gap-2 items-center">
          <Tooltip
            placement="top"
            content={
              <div className=" flex flex-col">
                <p className=" text-ellipsis leading-none text-nowrap text-[1.5vw]">
                  {data?.name}
                </p>
                <p className=" leading-none text-wrap">{data?.email}</p>
              </div>
            }
          >
            <div
              //   onClick={() => handleProfile(data)}
              className="  gap-2 overflow-x-hidden flex-1 flex"
            >
              <Skeleton
                isLoaded={!isPending}
                className="flex rounded-full w-12 h-12"
              >
                <Avatar src={`${data?.image}`}></Avatar>
              </Skeleton>
              <div className=" w-full h-auto flex flex-col gap-2">
                <Skeleton
                  isLoaded={!isPending}
                  className="h-3 w-3/5 rounded-lg"
                >
                  <p className=" text-ellipsis leading-none text-nowrap text-[1.5vw]">
                    {data?.name}
                  </p>
                </Skeleton>
                <Skeleton
                  isLoaded={!isPending}
                  className=" h-3  w-4/5 rounded-lg"
                >
                  <p className=" leading-none text-wrap">{data?.email}</p>
                </Skeleton>
              </div>
            </div>
          </Tooltip>
          <Skeleton
            // className=" w-[15%]"
            isLoaded={!isPending}
          >
            {unFollowPending ? (
              "un-Following..."
            ) : (
              <Button onClick={() => handleUnFollow(data)}>Unfollow</Button>
            )}
          </Skeleton>
        </div>
      }
    </div>
  );
};

export default UserFollow;
