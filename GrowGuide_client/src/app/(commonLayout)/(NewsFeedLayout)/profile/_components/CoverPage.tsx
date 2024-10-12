import { Avatar, Button } from "@nextui-org/react";
import React from "react";

const CoverPage = ({ CurrentUser }: any) => {
  return (
    <>
      <div className="relative group/cover">
        <img
          src={`${CurrentUser?.image}`}
          className="h-52 w-full object-cover"
          alt="cover image"
        />

        {/* <input
        type="file"
        hidden
        accept="image/*"
        ref={coverImgRef}
        onChange={(e) => handleImgChange(e, "coverImg")} */}
      </div>
      <div className="  h-fit avatar px-5 leading-none relative flex justify-between items-center">
        <div className="  relative leading-none w-[130px] h-[130px] flex justify-center items-center rounded-full group/avatar">
          <Avatar className=" w-full h-full" src={`${CurrentUser?.image}`} />
        </div>

        <Button className=" relative font-chirpMedium rounded-full right-5 text-[15px] border border-[#536371] bg-transparent hover:bg-[#181919]">
          Edit profile
        </Button>
      </div>
    </>
  );
};

export default CoverPage;
