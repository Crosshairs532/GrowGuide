import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" flex border-2 justify-around">
      <h1 className=" border-2">Left Side bad</h1>
      {children}
    </div>
  );
};

export default CommonLayout;
