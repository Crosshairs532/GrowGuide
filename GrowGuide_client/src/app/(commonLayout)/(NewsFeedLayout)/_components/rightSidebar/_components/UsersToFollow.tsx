"use client";
import { useGetAllusers } from "@/hooks/useGetAllUsers";
import { Avatar, Button, Skeleton, Tooltip, User } from "@nextui-org/react";
import React from "react";

const UsersToFollow = () => {
  const { data, isPending, isSuccess, isFetching } = useGetAllusers();

  console.log(isPending);
  return (
    <div className=" grid grid-cols-1">
      {data?.map((user: any, index: boolean) => (
        <div key={user} className=" flex items-center justify-between ">
          {
            <>
              <div className="  w-full flex justify-between gap-2 items-center">
                <Tooltip
                  placement="top"
                  content={
                    <div className=" flex flex-col">
                      <p className=" text-ellipsis leading-none text-nowrap text-[1.5vw]">
                        {user?.name}
                      </p>
                      <p className=" leading-none text-wrap">{user?.email}</p>
                    </div>
                  }
                >
                  <div className="  gap-2 overflow-x-hidden flex-1 flex">
                    <Skeleton
                      isLoaded={!isPending && isSuccess}
                      className="flex rounded-full w-12 h-12"
                    >
                      <Avatar src={`${user?.image}`}></Avatar>
                    </Skeleton>
                    <div className=" w-full h-auto flex flex-col gap-2">
                      <Skeleton
                        isLoaded={!isPending && isSuccess}
                        className="h-3 w-3/5 rounded-lg"
                      >
                        <p className=" text-ellipsis leading-none text-nowrap text-[1.5vw]">
                          {user?.name}
                        </p>
                      </Skeleton>
                      <Skeleton
                        isLoaded={!isPending && isSuccess}
                        className=" h-3  w-4/5 rounded-lg"
                      >
                        <p className=" leading-none text-wrap">{user?.email}</p>
                      </Skeleton>
                    </div>
                  </div>
                </Tooltip>
                <Skeleton
                  // className=" w-[15%]"
                  isLoaded={!isPending && isSuccess}
                >
                  <Button>Follow</Button>
                </Skeleton>
              </div>
            </>
          }
        </div>
      ))}
    </div>
  );
};

export default UsersToFollow;
