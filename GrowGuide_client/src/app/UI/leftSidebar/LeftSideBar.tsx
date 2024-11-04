/* eslint-disable prettier/prettier */
"use client";

import { useGrowContext } from "@/app/Context/GrowContext";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { logout } from "@/services/authService/auth.service";
import { getData } from "@/services/profileService/profile.Service";
import HomeIcon from "@/utils/Icons/HomeIcon";
import Logo from "@/utils/Icons/Logo";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  Bell,
  Bookmark,
  CloudFog,
  Ellipsis,
  Feather,
  Images,
  LayoutDashboard,
  Mails,
  NotebookTabs,
  Search,
  SearchSlash,
  ShieldHalf,
  Slash,
  TreeDeciduous,
  UserRound,
  UserRoundPen,
  UsersRound,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import PostCreateModal from "../post/PostCreateModal";

const LeftSideBar = () => {
  const { user, setUser, handleUser, setIsLoading, loading } = useGrowContext();
  const { data } = useCurrentUser(user?._id, loading);
  const router = useRouter();

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
      // link: "/communities",
      link: "/",
      icon: <UsersRound />,
      title: "Communities",
    },
    {
      link: `/`,
      icon: <Search />,
      title: "Explore",
    },
    {
      link: `/`,
      icon: <Bell />,
      title: "Notifications",
    },
    {
      link: `/imageGallery`,
      icon: <Images />,
      title: "Gallery",
    },
    {
      link: "/premium",
      icon: <TreeDeciduous />,
      title: "Premium",
    },
    {
      link: `/about`,
      icon: <SearchSlash />,
      title: "About",
    },
    {
      link: `/contact`,
      icon: <NotebookTabs />,
      title: "Contact Us",
    },
    user && {
      link: ` ${user?.role === "user" ? `/profile/${user?._id}` : user?.role === "admin" ? `/profile/${user?._id}` : null} `,
      icon:
        user?.role === "user" ? (
          <UserRound />
        ) : user?.role === "admin" ? (
          <ShieldHalf />
        ) : null,
      title: ` ${user ? (user?.role === "user" ? "Profile" : user?.role === "admin" ? "Admin" : null) : null} `,
    },
    {
      link: `/dashboard/${user?.role}`,
      icon: <LayoutDashboard />,
      title: "Dashboard",
    },
  ];

  useEffect(() => {
    handleUser();
  }, [loading]);
  const handleLogout = async () => {
    logout();
    await handleUser();
    setUser(null);
    setIsLoading(true);
    console.log(user);

    return router.replace("/login");
  };

  console.log(data?.status);

  return (
    <div className=" flex flex-col items-start justify-between h-full ">
      <div className=" mx-auto w-[90%] mt-[4px] flex justify-center lg:justify-start items-center duration-400  hover:bg-[#181818] ">
        <Link href={sidebarItems[0].link}>
          <Logo width="50" height="50" />
        </Link>
      </div>

      <div className=" w-[90%] mx-auto  mt-2 space-y-[10px] justify-center lg:items-start items-center flex flex-col">
        {sidebarItems
          ?.slice(1)
          .filter(
            (item) => !(data?.status === "Premium" && item.link === "/premium")
          )
          .map(
            (item, index) =>
              item?.title != null && (
                <Link key={index} href={item?.link}>
                  <Button
                    color="default"
                    variant="light"
                    className={` flex justify-center items-center rounded-full w-auto gap-4 font-chirpMedium text-[20px] lg:justify-between lg:items-center`}
                    key={index}
                  >
                    {item?.icon}
                    <span className=" lg:block hidden">{item?.title}</span>
                  </Button>
                </Link>
              )
          )}
      </div>
      <PostCreateModal></PostCreateModal>
      <div className=" mb-2 mx-auto hover:bg-[#181818] gap-2 rounded-full flex items-center justify-center duration-250">
        {user ? (
          <Dropdown>
            <DropdownTrigger className=" border-[#2F3336] border-2">
              <Avatar
                className=" w-[8vh] h-[8vh] rounded-full"
                src={user?.image}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onClick={handleLogout} key="logout">
                Log Out
              </DropdownItem>
              <DropdownItem key="profile">
                <div className=" lg:flex hidden">
                  <div className="  overflow-ellipsis flex flex-col">
                    <span className=" font-chirpMedium text-[15px]">
                      {user?.name}
                    </span>
                    <span className=" text-[#E7E9EA1A]">{user?.email}</span>
                  </div>
                  <Ellipsis />
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button className=" mx-auto">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
