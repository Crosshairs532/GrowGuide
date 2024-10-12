"use client";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CoverPage from "./_components/CoverPage";
import { useGetTabData } from "@/hooks/getTabData";
import { useGrowContext } from "@/app/Context/GrowContext";

const ProfilePage = ({ params, searchParams }: any) => {
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const [tabData, setTabData] = useState<any[]>([]);
  const { user: CurrentUser, loading } = useGrowContext();
  const { data, isPending, refetch, isFetching } = useGetTabData(
    CurrentUser?._id,
    CurrentUser?.email,
    loading
  );

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  console.log(params, searchParams);

  // const followers = CurrentUser?.followers;
  // const following = CurrentUser?.following;
  // const favourites = CurrentUser?.favourites;

  const user = {
    fullName: "John Doe",
    username: "johndoe",
    bio: "Web Developer",
    coverImg: null,
    profileImg: null,
    link: "https://johndoe.dev",
    createdAt: "2020-01-01",
    following: [1, 2],
    followers: [1, 2, 3],
  };

  const toggles = [
    { label: "Posts", value: "posts" },
    { label: "Likes", value: "likes" },
    { label: "Followers", value: "followers" },
    { label: "Following", value: "following" },
  ];

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     state === "coverImg" && setCoverImg(reader.result);
    //     state === "profileImg" && setProfileImg(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  console.log(data);
  useEffect(() => {
    refetch();

    switch (feedType) {
      case "posts":
        break;
      case "likes":
        setTabData([...data?.favourites]);
        break;
      case "followers":
        setTabData([...data?.followers]);
        break;
      case "following":
        setTabData([...data?.following]);
        break;
    }
  }, [feedType, refetch]);

  return (
    <div className="flex-[4_4_0]  border-r border-gray-700 min-h-screen ">
      <div className="flex flex-col">
        {/* profile header section */}
        <div className="flex gap-10 px-4 py-2 items-center">
          <ArrowLeft />
          <div className="flex flex-col">
            <p className="font-bold font-chirpBold text-[20px]">
              {CurrentUser?.fullName}
            </p>
            <span className="text-sm font-chirpRegular text-[#71767A]">
              5 posts
            </span>
          </div>
        </div>

        <CoverPage CurrentUser={CurrentUser} />

        {/* USER INFO */}
        <div className="flex flex-col gap-2 mt-5  px-4">
          <span className=" leading-none font-chirpBold text-[20px] font-bold text-lg">
            {CurrentUser?.fullName}
          </span>

          <div className="flex gap-2"></div>
          <div className="flex gap-2 items-center">
            <span className="text-sm font-chirpMedium text-[#71767A]">
              Joined 2020
            </span>
          </div>

          <div className=" font-chirpMedium flex gap-2">
            <span className="font-bold text-sm">
              {CurrentUser?.following.length}
            </span>
            <span className=" font-chirpMedium  text-[#71767A] text-sm">
              Following
            </span>
            <span className=" font-chirpMedium  font-bold text-sm">
              {CurrentUser?.followers.length}
            </span>
            <span className="text-[#71767A] text-sm">Followers</span>
          </div>
        </div>

        {/* FEED TOGGLE */}
        <div className=" flex font-chirpRegular w-full border-b border-gray-700 mt-4">
          {toggles?.map((tab, index) => (
            <div
              key={index}
              className={`flex justify-center w-fit  flex-1 p-3 ${
                feedType === `${tab.value}`
                  ? " text-[#E6E9EA] font-chirpBold border-[#1C9BEF]  border-b-2"
                  : "text-slate-500"
              } cursor-pointer`}
              onClick={() => {
                setFeedType(tab.value);
                // handleTabData(tab.value);
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* POSTS FEED */}
        <div className=" p-5">
          {tabData.length > 0
            ? tabData.map((data, index) => {
                return <p>{index}</p>;
              })
            : "no data found"}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
