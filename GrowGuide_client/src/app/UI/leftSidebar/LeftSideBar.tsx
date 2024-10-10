"use client";

import { useGrowContext } from "@/app/Context/GrowContext";
import HomeIcon from "@/utils/Icons/HomeIcon";
import Logo from "@/utils/Icons/Logo";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import {
  Bell,
  Bookmark,
  Ellipsis,
  Mails,
  Search,
  Slash,
  TreeDeciduous,
  UserRound,
  UserRoundPen,
  UsersRound,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const LeftSideBar = () => {
  const { user } = useGrowContext();

  const sidebarItems = [
    {
      link: "/",
      icon: <Logo width="50" height="50" />,
      title: "",
    },

    {
      link: "/",
      icon: <HomeIcon />,
      title: "Home",
    },
    {
      link: "/about",
      icon: <Logo width="25" height="25" />,
      title: "GrowGuide",
    },
    {
      link: "/communities",
      icon: <UsersRound />,
      title: "Communities",
    },
    {
      link: `/${user?.name}`,
      icon: <Search />,
      title: "Explore",
    },
    {
      link: `/${user?.name}`,
      icon: <Bell />,
      title: "Notifications",
    },
    {
      link: `/${user?.name}`,
      icon: <Mails />,
      title: "Messages",
    },
    {
      link: `/${user?.name}`,
      icon: <TreeDeciduous />,
      title: "Premium",
    },
    {
      link: `/${user?.name}`,
      icon: <Bookmark />,
      title: "Bookmarks",
    },
    {
      link: `/${user?.name}`,
      icon: <Slash />,
      title: "Grook",
    },
    {
      link: `/${user?.name}`,
      icon: <Zap />,
      title: "Verified Orgs",
    },
    {
      link: `/${user?.name}`,
      icon: <UserRound />,
      title: "Profile",
    },
  ];
  return (
    <div className=" flex flex-col items-start justify-between h-full ">
      <div className=" mt-[4px] ml-1 flex justify-center items-center duration-400 w-[50px] h-[50px] rounded-full hover:bg-[#181818] ">
        <Link href={sidebarItems[0].link}>
          <Logo width="50" height="50" />
        </Link>
      </div>

      <div className=" w-[90%] mt-2 space-y-[10px] flex flex-col">
        {sidebarItems.slice(1).map((item, index) => (
          <Link href={item.link}>
            <Button
              color="default"
              variant="light"
              className={`  rounded-full w-auto flex gap-4 font-chirpMedium text-[20px] justify-between items-center`}
              key={index}
            >
              {item.icon}
              <span>{item.title}</span>
            </Button>
          </Link>
        ))}
      </div>
      <Button
        size="lg"
        className=" mx-auto py-7 px-4 mt-4 w-[90%] rounded-full hover:bg-[#188CD8] duration-200 bg-[#188CD8] text-[20px] font-chirpMedium"
      >
        Post
      </Button>
      <div className=" mb-2 py-4 hover:bg-[#181818] gap-2 rounded-full w-[98%]  duration-250">
        <Button
          color="default"
          className=" bg-transparent rounded-full w-full flex items-center justify-between"
        >
          <Avatar size="sm" />
          <div className=" flex flex-col">
            <span className=" font-chirpMedium text-[15px]">{user?.name}</span>
            <span className=" text-[#E7E9EA1A]">{user?.email}</span>
          </div>
          <Ellipsis />
        </Button>
      </div>
    </div>
  );
};

export default LeftSideBar;
