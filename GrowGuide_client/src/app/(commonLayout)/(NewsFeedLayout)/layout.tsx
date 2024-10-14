"use client";

import React, { ReactNode } from "react";

import { usePathname } from "next/navigation";

import RightBar from "./_components/rightSidebar/page";
import MakePost from "./_components/MakePost";

const NewsFeedLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <>
      <div className=" flex ">
        <div>
          {pathname === "/" && <MakePost />}
          {/* <div className=" flex-grow">{userProfile}</div> */}
          <div className=" w-[42vw]">{children}</div>
        </div>
        {/* <div className=" flex-grow">{rightSidebar}</div> */}
        <div className=" flex-grow">
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default NewsFeedLayout;
