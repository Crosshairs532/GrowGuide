"use client";

import { useGrowContext } from "@/app/Context/GrowContext";
import { logout } from "@/services/authService/auth.service";
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
  Images,
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

const LeftSideBar = () => {
  const { user, setUser, handleUser, setIsLoading, loading } = useGrowContext();
  const router = useRouter();

  console.log(user);
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
      link: `/`,
      icon: <TreeDeciduous />,
      title: "Premium",
    },
    {
      link: `/about`,
      icon: <SearchSlash />,
      title: "About",
    },
    {
      link: `/`,
      icon: <Slash />,
      title: "Dashboard",
    },
    {
      link: `/contact`,
      icon: <NotebookTabs />,
      title: "Contact Us",
    },
    {
      link: ` ${user?.role === "user" ? "/profile" : user?.role === "admin" ? "/admin" : ""} `,
      icon:
        user?.role === "user" ? (
          <UserRound />
        ) : user?.role === "admin" ? (
          <ShieldHalf />
        ) : null,
      title: ` ${user?.role === "user" ? "Profile" : user?.role === "admin" ? "Admin" : ""} `,
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
    if (!user) {
      router.push("/login");
    }
    router.push("/login");
  };
  return (
    <div className=" flex flex-col items-start justify-between h-full ">
      <div className=" mt-[4px] ml-1 flex justify-center items-center duration-400 w-[50px] h-[50px] rounded-full hover:bg-[#181818] ">
        <Link href={sidebarItems[0].link}>
          <Logo width="50" height="50" />
        </Link>
      </div>

      <div className=" w-[90%] mt-2 space-y-[10px] flex flex-col">
        {sidebarItems.slice(1).map((item, index) => (
          <Link key={index} href={item.link}>
            <Button
              color="default"
              variant="light"
              className={`  rounded-full w-auto flex gap-4 font-chirpMedium text-[20px] justify-between items-center`}
              key={index}
            >
              {item?.icon}
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
        {user ? (
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="default"
                className=" bg-transparent rounded-full w-full flex items-center justify-between"
              >
                <Avatar size="sm" src={user?.image} />
                <div className=" flex flex-col">
                  <span className=" font-chirpMedium text-[15px]">
                    {user?.name}
                  </span>
                  <span className=" text-[#E7E9EA1A]">{user?.email}</span>
                </div>
                <Ellipsis />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem onClick={handleLogout} key="logout">
                Log Out
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
