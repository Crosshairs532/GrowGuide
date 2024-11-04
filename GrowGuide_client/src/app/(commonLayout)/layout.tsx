import React, { ReactNode } from "react";
import LeftSideBar from "../UI/leftSidebar/LeftSideBar";
import MobileNavUser from "../UI/leftSidebar/MobileNavUser";

import MobileNavItems from "./_components/MobileNavItems";

const commonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" overflow-hidden relative flex border-red-500 mainLayout container justify-between h-screen mx-auto  flex-grow">
      <div className=" sm:block hidden w-[13vw] lg:w-[28vw] h-screen">
        <LeftSideBar />
      </div>
      <div className=" w-[100vw] relative flex flex-col h-screen ">
        <div className=" sm:gap-0 gap-3 header z-30 flex justify-center items-center bg-black/50 border-b border-l backdrop-blur-md fixed px-3 w-[100vw] border-[#2F3336] h-[7vh] md:w-[87vw] lg:w-[75%]">
          <MobileNavUser />
          <input
            type="text"
            placeholder="Ask GrowGuide ? "
            className="  px-4 py-1 w-full rounded-xl  border-[#2F3336] border"
          />
        </div>
        <MobileNavItems />
        <main className=" overscroll-none overflow-y-auto h-screen w-full pt-[7vh] ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default commonLayout;
