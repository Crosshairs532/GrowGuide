/* eslint-disable prettier/prettier */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Skeleton, Avatar } from "@nextui-org/react";
import UserPosts from "@/app/(commonLayout)/(NewsFeedLayout)/profile/[profileId]/_components/UserPosts";
import { useGrowContext } from "@/app/Context/GrowContext";
import { useGetTabData } from "@/hooks/getTabData";
import Link from "next/link";
import Users from "./Users";
import UserFollow from "@/app/(commonLayout)/(NewsFeedLayout)/profile/[profileId]/_components/UserFollow";
import { ExternalLink } from "lucide-react";
const TabsPage = () => {
  const { user, loading } = useGrowContext();
  const [tabData, setTabData] = useState<any[]>([]);
  const { data, isPending, refetch, isFetching } = useGetTabData(
    user?._id,
    loading
  );
  const [selected, setSelected] = useState("");
  let tabs = [
    {
      id: "posts",
      label: "All Posts",
    },
    {
      id: "followers",
      label: "Followers",
    },
    {
      id: "following",
      label: "Following",
    },
  ];

  useEffect(() => {
    // Refetch data when feedType or params change
    refetch();

    switch (selected) {
      case "posts":
        setTabData(data?.posts || []);
        break;
      case "likes":
        setTabData(data?.favourites || []);
        break;
      case "followers":
        setTabData(data?.followers || []);
        break;
      case "following":
        setTabData(data?.following || []);
        break;
      default:
        setTabData([]);
        break;
    }
  }, [selected, data, refetch]);
  return (
    <div className=" pt-[10vh] z-30 flex flex-col items-center gap-4  bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Tabs
        fullWidth
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        variant="underlined"
        aria-label="Dynamic tabs"
        items={tabs}
        classNames={{
          tabList: "gap-6 border-divider",
        }}
      >
        {(item) => (
          <Tab
            className=" w-full"
            onClick={() => setSelected(item.id)}
            key={item?.id}
            title={item?.label}
          >
            {selected == "posts" && (
              <div className=" p-5">
                <UserPosts CurrentUser={user?._id} />
              </div>
            )}
            {selected === "followers" && (
              <div className=" w-full ">
                {tabData?.length > 0 ? (
                  <>
                    <div className=" sm:block hidden">
                      <Users isPending={isPending} tabData={tabData} />
                    </div>
                    <div className=" sm:hidden block">
                      {
                        <div className=" flex flex-col p-5">
                          {tabData?.length > 0
                            ? tabData?.map((data, index) => (
                                <div
                                  key={data?._id}
                                  className=" flex items-center justify-between "
                                >
                                  {
                                    <div className=" group w-full flex justify-between gap-2 items-center">
                                      <div className="  items-center gap-2 overflow-x-hidden flex-1 flex">
                                        <Skeleton
                                          isLoaded={!isPending}
                                          className="flex rounded-full w-12 h-12"
                                        >
                                          <Avatar
                                            src={`${data?.image}`}
                                          ></Avatar>
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
                                            <p className=" leading-none text-wrap">
                                              {data?.email}
                                            </p>
                                          </Skeleton>
                                        </div>
                                        <Link
                                          className=" duration-250 group-hover:text-[#188CD8]"
                                          href={`/profile/${data?._id}`}
                                        >
                                          <ExternalLink size={20} />
                                        </Link>
                                      </div>
                                    </div>
                                  }
                                </div>
                              ))
                            : "no data found"}
                        </div>
                      }
                    </div>
                  </>
                ) : (
                  "no data found"
                )}
              </div>
            )}

            {selected === "following" && (
              <div className=" p-5">
                {tabData?.length > 0
                  ? tabData?.map((data, index) => {
                      return (
                        <UserFollow
                          key={index}
                          isPending={isPending}
                          data={data}
                        />
                      );
                    })
                  : "no data found"}
              </div>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default TabsPage;
