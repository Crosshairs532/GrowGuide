/* eslint-disable prettier/prettier */
"use client";
import { useGrowContext } from "@/app/Context/GrowContext";
import { logout } from "@/services/authService/auth.service";
import Logo from "@/utils/Icons/Logo";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Ellipsis, TableOfContents } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DashboardSidebar = () => {
  const { user, setUser, handleUser, setIsLoading, loading } = useGrowContext();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
    await handleUser();
    setUser(null);
    setIsLoading(true);
    console.log(user);
    if (!user) {
      router.replace("/login");
    }
    router.replace("/login");
  };

  const adminRoutes = [
    {
      link: `/dashboard/admin/`,
      icon: <TableOfContents />,
      title: "Activity",
    },
    {
      link: `/dashboard/admin/manage-content`,
      icon: <TableOfContents />,
      title: "Manage Content",
    },
    {
      link: `/dashboard/admin/manage-user`,
      icon: <TableOfContents />,
      title: "Manage User",
    },
    {
      link: `/dashboard/admin/manage-payment`,
      icon: <TableOfContents />,
      title: "Manage Payment",
    },
  ];

  return (
    <div className="fixed px-3 top-0 left-0 py-[5vh] flex items-center justify-between flex-col bottom-0 z-10 border-r border-[#2F3336] bg-background w-[10vh] sm:w-[20vh]">
      <div className=" ">
        <Link href="/">
          <Logo width="50" height="50" />
        </Link>
      </div>
      <div className="  h-full flex flex-col  justify-center gap-5">
        {user?.role === "admin" &&
          adminRoutes.map((routes, idx) => (
            <Link
              key={idx}
              className=" flex items-center"
              href={`${routes.link}`}
            >
              <div className=" sm:hidden block">{routes.icon}</div>
              <p className=" sm:block hidden"> {routes.title}</p>
            </Link>
          ))}
      </div>
      <div className=" ">
        <div className=" mb-2  hover:bg-[#181818] p-2 gap-2 rounded-full border border-[#2F3336] duration-250">
          {user ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar size="lg" src={user?.image} />
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
    </div>
  );
};

export default DashboardSidebar;
