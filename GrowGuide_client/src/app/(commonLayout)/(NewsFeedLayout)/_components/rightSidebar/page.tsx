import React, { Suspense } from "react";
import UsersToFollow from "./_components/UsersToFollow";

const RightBar = () => {
  return (
    <div className=" -top-[50%] sticky  space-y-4 px-4">
      <div className=" px-4 py-2 min-h-[50vh] z-10 border border-[#2F3336] rounded-3xl">
        <h1 className=" font-chirpBold p-2 ">Who To follow</h1>
        <UsersToFollow />
      </div>

      <div className=" px-4 py-2 min-h-[50vh] border-[#2F3336] z-10 border rounded-3xl">
        <h1 className=" font-chirpBold p-2 ">Trends For You</h1>
      </div>
    </div>
  );
};

export default RightBar;
