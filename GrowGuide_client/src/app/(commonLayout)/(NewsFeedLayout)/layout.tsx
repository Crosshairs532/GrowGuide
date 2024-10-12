"use client";

import React, { ReactNode } from "react";
import MakePost from "./@rightSidebar/_components/MakePost";
import { usePathname } from "next/navigation";

const NewsFeedLayout = ({
  children,
  rightSidebar,
}: {
  children: ReactNode;
  rightSidebar: ReactNode;
}) => {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <>
      <div className=" flex ">
        <div>
          {pathname === "/" && <MakePost />}
          <div className=" w-[42vw]">{children}</div>
        </div>
        <div className=" flex-grow">{rightSidebar}</div>
      </div>
    </>
  );
};

export default NewsFeedLayout;
