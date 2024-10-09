import React from "react";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex mainLayout border-2 container h-screen mx-auto max-w-7xl pt-16 flex-grow">
      <div className=" bg-red-500 w-[20%]">sidebar</div>
      <div className=" bg-yellow-500 w-[80%] relative flex flex-col h-screen border-">
        <main className=" h-screen w-full">{children}</main>
      </div>
    </div>
  );
};

export default commonLayout;
