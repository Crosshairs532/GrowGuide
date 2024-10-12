import React, { Suspense } from "react";
import UsersToFollow from "./_components/UsersToFollow";

const RightBar = async () => {
  let load = true;
  if (load) {
    setTimeout(() => {}, 6000);
  }

  return (
    <div className=" border-2 space-y-4 px-4">
      <div className=" h-[50vh] z-10 ">
        <h1 className=" top-0  sticky  p-2 bg-red-500">Trends For You</h1>

        <div>
          <UsersToFollow />
        </div>
      </div>

      <div className=" relative h-[50vh] z-10 ">
        <h1 className=" top-0 sticky  p-2 bg-red-500">who to You</h1>
      </div>
    </div>
  );
};

export default RightBar;
