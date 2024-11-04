"use client";
import { Button } from "@nextui-org/button";
import { Avatar, Skeleton, Tooltip } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CoverPage from "../_components/CoverPage";
import { useGetTabData } from "@/hooks/getTabData";
import { useGrowContext } from "@/app/Context/GrowContext";
import UsersToFollow from "../../_components/rightSidebar/_components/UsersToFollow";
import UserFollow from "./_components/UserFollow";
import { useFollowuser } from "@/hooks/useFollowuser";
import UserPosts from "./_components/UserPosts";
import Link from "next/link";
import PostCard from "@/app/UI/post/PostCard";

const ProfilePage = ({ params, searchParams }: any) => {
  const { profileId } = params;
  const [feedType, setFeedType] = useState("posts");
  const [tabData, setTabData] = useState<any[]>([]);
  const { user: CurrentUser, loading } = useGrowContext();

  //! error fetching
  // Fetch tab data (posts, followers, following, etc.)
  const { data, isPending, refetch, isFetching } = useGetTabData(
    profileId,
    loading
  );

  console.log(params, searchParams);

  const toggles = [
    { label: "Posts", value: "posts" },
    { label: "Likes", value: "likes" },
    { label: "Followers", value: "followers" },
    { label: "Following", value: "following" },
  ];

  console.log(data);
  // useEffect(() => {
  //   refetch();
  //   switch (feedType) {
  //     case "posts":
  //       break;
  //     case "likes":
  //       setTabData((prev) => [...data?.favourites]);
  //       break;
  //     case "followers":
  //       setTabData((prev) => [...data?.followers]);
  //       break;
  //     case "following":
  //       setTabData((prev) => [...data?.following]);
  //       break;
  //   }
  // }, [feedType, refetch, params, data]);

  // console.log(data?.name, "one");

  useEffect(() => {
    // Refetch data when feedType or params change
    refetch();

    switch (feedType) {
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
  }, [feedType, data, refetch]);

  console.log(data, tabData);

  return (
    <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
      <div className="flex flex-col">
        {/* profile header section */}
        <div className="flex gap-10 px-4 py-2 items-center">
          <ArrowLeft />
          <div className="flex flex-col">
            <p className="font-bold font-chirpBold text-[20px]">{data?.name}</p>
            <span className="text-sm font-chirpRegular text-[#71767A]">
              {tabData?.length || 0} posts
            </span>
          </div>
        </div>

        <CoverPage refetch={refetch} data={data} CurrentUser={CurrentUser} />

        {/* USER INFO */}
        <div className="flex flex-col gap-2 mt-5  px-4">
          <span className=" leading-none font-chirpBold text-[20px] font-bold text-lg">
            {data?.name}
          </span>

          <div className="flex gap-2"></div>
          <div className="flex gap-2 items-center">
            <span className="text-sm font-chirpMedium text-[#71767A]">
              Joined 2024
            </span>
          </div>

          <div className=" font-chirpMedium flex gap-2">
            <span className="font-bold text-sm">{data?.following.length}</span>
            <span className=" font-chirpMedium  text-[#71767A] text-sm">
              Following
            </span>
            <span className=" font-chirpMedium  font-bold text-sm">
              {data?.followers.length}
            </span>
            <span className="text-[#71767A] text-sm">Followers</span>
          </div>
        </div>

        {/* FEED TOGGLE */}
        <div className=" flex font-chirpRegular w-full border-b border-gray-700 mt-4">
          {toggles?.map((tab, index) => (
            <div
              role="button"
              tabIndex={0}
              key={index}
              className={`flex justify-center w-fit  flex-1 p-3 ${
                feedType === `${tab?.value}`
                  ? " text-[#E6E9EA] font-chirpBold border-[#1C9BEF]  border-b-2"
                  : "text-slate-500"
              } cursor-pointer`}
              onClick={() => {
                setFeedType(tab?.value);
                // handleTabData(tab.value);
              }}
            >
              {tab?.label}
            </div>
          ))}
        </div>

        {/* POSTS FEED */}
        {feedType === "posts" && (
          <div className=" p-5">
            <UserPosts CurrentUser={profileId} />
          </div>
        )}

        {/*Likes*/}
        {feedType === "likes" && (
          <div className=" p-5">
            {tabData?.map((LikedPost: any, idx: number) => (
              <PostCard refetch="" key={idx} post={LikedPost} />
            ))}
          </div>
        )}

        {/*Follower*/}

        {feedType === "followers" && (
          <div className=" p-5">
            {tabData?.length > 0
              ? tabData?.map((data, index) => (
                  <Link key={index} href={`/profile/${data?._id}`}>
                    <div
                      key={data?._id}
                      className=" flex items-center justify-between "
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
                                <p className=" leading-none text-wrap">
                                  {data?.email}
                                </p>
                              </div>
                            }
                          >
                            <div className="  gap-2 overflow-x-hidden flex-1 flex">
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
                                  <p className=" leading-none text-wrap">
                                    {data?.email}
                                  </p>
                                </Skeleton>
                              </div>
                            </div>
                          </Tooltip>
                        </div>
                      }
                    </div>
                  </Link>
                ))
              : "no data found"}
          </div>
        )}

        {/*Following*/}
        {feedType === "following" && (
          <div className=" p-5">
            {tabData?.length > 0
              ? tabData?.map((data, index) => {
                  return (
                    <UserFollow key={index} isPending={isPending} data={data} />
                  );
                })
              : "no data found"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
