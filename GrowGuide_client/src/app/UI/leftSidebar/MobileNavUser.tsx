"use client";
import React, { useEffect } from "react";

/* eslint-disable prettier/prettier */

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
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MobileNavUser = () => {
  const { user, setUser, handleUser, setIsLoading, loading } = useGrowContext();
  const { data } = useCurrentUser(user?._id, loading);

  const router = useRouter();
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
    <div className=" sm:hidden mx-auto hover:bg-[#181818] gap-2 rounded-full flex items-center justify-center duration-250">
      {user ? (
        <Dropdown>
          <DropdownTrigger className=" border-[#2F3336] border-2">
            <Avatar size="md" className=" rounded-full" src={user?.image} />
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
  );
};

export default MobileNavUser;
