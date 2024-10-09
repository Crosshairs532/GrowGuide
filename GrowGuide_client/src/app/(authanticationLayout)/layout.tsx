import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <div className=" h-screen w-full text-black">{children}</div>;
};

export default layout;
