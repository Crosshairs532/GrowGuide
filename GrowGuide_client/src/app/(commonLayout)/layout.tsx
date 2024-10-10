import React, { ReactNode } from "react";
import LeftSideBar from "../UI/leftSidebar/LeftSideBar";
import Link from "next/link";

const commonLayout = ({
  children,

  rightSidebar,
}: {
  children: ReactNode;

  rightSidebar: ReactNode;
}) => {
  return (
    <div className=" flex mainLayout px-5 container h-screen mx-auto max-w-7xl  flex-grow">
      <div className="  w-[21%] h-screen">
        <LeftSideBar />
      </div>
      <div className=" bg-yellow-500 w-[76%] relative flex flex-col h-screen border-">
        <h1 className=" fixed border-[1px] w-[50vw]">header</h1>
        <main className=" h-screen flex w-full pt-16">
          <div className=" border-[1px] w-[80vh]">{children}</div>
          <div className=" flex-grow border-[1px]">{rightSidebar}</div>
        </main>
      </div>
    </div>
  );
};

export default commonLayout;
