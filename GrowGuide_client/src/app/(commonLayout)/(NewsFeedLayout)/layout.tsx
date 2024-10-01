import React, { ReactNode } from "react";

const NewsFeedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" border-2 w-full flex flex-row-reverse justify-between">
      Right Side news Layout
      {children}
    </div>
  );
};

export default NewsFeedLayout;
