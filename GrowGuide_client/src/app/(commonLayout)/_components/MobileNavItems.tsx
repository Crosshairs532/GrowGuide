"use client";
import React, { useEffect } from "react";
import {
  HomeIcon,
  Images,
  ShieldHalf,
  TreeDeciduous,
  UserRound,
  NotebookTabs,
  LayoutDashboard,
} from "lucide-react";
import Logo from "@/utils/Icons/Logo";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { useGrowContext } from "@/app/Context/GrowContext";
import { logout } from "@/services/authService/auth.service";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import PostCreateModal from "@/app/UI/post/PostCreateModal";
const MobileNavItems = () => {
  const { user, setUser, handleUser, setIsLoading, loading } = useGrowContext();
  const { data } = useCurrentUser(user?._id, loading);
  const router = useRouter();
  const mobileNavItem = [
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
  return (
    <>
      <div className=" left-0 right-0 flex border-red-500 sm:hidden justify-evenly items-center fixed bottom-0 w-full z-30 h-[10vw] bg-[#000000] backdrop-blur-xl">
        {/* <PostCreateModal /> */}
        {mobileNavItem
          ?.filter(
            (item) => !(data?.status === "Premium" && item.link === "/premium")
          )
          .map(
            (item, index) =>
              item?.title != null && (
                <Link key={index} href={item?.link}>
                  <Button
                    size="sm"
                    color="default"
                    variant="light"
                    className={` w-[2px] rounded-full font-chirpMedium`}
                    key={index}
                  >
                    {item?.icon}
                  </Button>
                </Link>
              )
          )}
      </div>
    </>
  );
};

export default MobileNavItems;
