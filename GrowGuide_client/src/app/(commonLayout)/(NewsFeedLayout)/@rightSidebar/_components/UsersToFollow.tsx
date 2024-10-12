"use client";
import { useGetAllusers } from "@/hooks/useGetAllUsers";
import { Avatar, Button, Skeleton, User } from "@nextui-org/react";
import React from "react";

const UsersToFollow = () => {
  const { data, isPending, isSuccess, isFetching } = useGetAllusers();

  console.log(isPending);
  return (
    <div className=" grid grid-cols-1 border-2 ">
      {data?.map((user: any, index: boolean) => (
        <div key={user} className=" flex items-center justify-between ">
          {
            <>
              <div className=" w-full flex justify-between items-center gap-3">
                <div>
                  <Skeleton
                    isLoaded={!isPending && isSuccess}
                    className="flex rounded-full w-12 h-12"
                  >
                    <Avatar src={`${user?.image}`}></Avatar>
                  </Skeleton>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton
                    isLoaded={!isPending && isSuccess}
                    className="h-3 w-3/5 rounded-lg"
                  >
                    <p>{user?.name}</p>
                  </Skeleton>
                  <Skeleton
                    isLoaded={!isPending && isSuccess}
                    className="h-3 w-4/5 rounded-lg"
                  >
                    <p className=" text-wrap">{user?.email}</p>
                  </Skeleton>
                </div>
                <Skeleton isLoaded={!isPending && isSuccess}>
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
