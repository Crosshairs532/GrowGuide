import React, { ReactNode } from "react";
import MakePost from "./@rightSidebar/_components/MakePost";

const NewsFeedLayout = ({
  children,
  rightSidebar,
}: {
  children: ReactNode;
  rightSidebar: ReactNode;
}) => {
  return (
    <>
      <div className=" flex ">
        <div>
          <MakePost />
          <div className=" w-[42vw]">{children}</div>
        </div>
        <div className=" flex-grow">{rightSidebar}</div>
      </div>
    </>
  );
};

export default NewsFeedLayout;
