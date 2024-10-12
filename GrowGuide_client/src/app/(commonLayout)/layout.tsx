import React, { ReactNode } from "react";
import LeftSideBar from "../UI/leftSidebar/LeftSideBar";
import Link from "next/link";
import { Divider } from "@nextui-org/react";

const commonLayout = ({
  children,

  // rightSidebar,
}: {
  children: ReactNode;

  // rightSidebar: ReactNode;
}) => {
  return (
    <div className=" overflow-hidden relative flex border-2 border-red-500 mainLayout container justify-between h-screen mx-auto max-w-7xl  flex-grow">
      <div className="  border-r-[0.1px] border-[#2F3336] w-[28vw] h-screen">
        <LeftSideBar />
      </div>
      <div className="  w-[100vw] relative flex flex-col h-screen ">
        <h1 className=" bg-black/15 backdrop-blur-md fixed border-[0.1px] border-[#2F3336] h-[7vh]  w-[69vw]">
          header
        </h1>
        <main className=" border-2 overflow-y-auto  h-screen w-full pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default commonLayout;
