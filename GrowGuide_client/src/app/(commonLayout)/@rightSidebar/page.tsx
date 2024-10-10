import React from "react";

const RightBar = () => {
  return (
    <div className="space-y-4 px-4">
      <div className=" h-[50vh] z-10 ">
        <h1 className=" top-0  sticky  p-2 bg-red-500">Trends For You</h1>
      </div>
      <div className=" relative h-[50vh] z-10 ">
        <h1 className=" top-0 sticky  p-2 bg-red-500">who to You</h1>
      </div>
    </div>
  );
};

export default RightBar;
