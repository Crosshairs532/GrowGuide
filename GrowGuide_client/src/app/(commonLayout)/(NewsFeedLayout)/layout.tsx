"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

import { usePathname } from "next/navigation";

import RightBar from "./_components/rightSidebar/page";
import MakePost from "./_components/MakePost";
import NewsFeedFilter from "./_components/NewsFeedFilter";
import { SlidersHorizontal } from "lucide-react";

const newsFeedContext = createContext<any>(null);
const NewsFeedLayout = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState("");
  const [textual, setTextual] = useState("");

  const pathname = usePathname();

  const value = { category: Array.from(category), textual };
  const handleTextual = (data: any) => {
    data.preventDefault();
    setTextual(data.target.value);
  };

  return (
    <>
      <div className="   flex min-h-screen ">
        <div className=" border border-[#2F3336] w-full md:w-[80vw] lg:w-[42vw]">
          {pathname === "/" && <MakePost />}
          {pathname === "/" && (
            <div className=" px-4 py-2">
              <NewsFeedFilter
                textual={textual}
                handleTextual={handleTextual}
                setCategory={setCategory}
              >
                <SlidersHorizontal color="#1C9BEF" />
              </NewsFeedFilter>
            </div>
          )}
          <newsFeedContext.Provider value={value}>
            <div className=" ">{children}</div>
          </newsFeedContext.Provider>
        </div>

        <div className=" hidden lg:block flex-grow">
          <RightBar />
        </div>
      </div>
    </>
  );
};

export const useNewFeedContext = () => {
  const context = useContext(newsFeedContext);
  if (context === null) {
    throw new Error("context null");
  }
  return context;
};

export default NewsFeedLayout;
