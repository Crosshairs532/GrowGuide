/* eslint-disable prettier/prettier */
"use client";
import React from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import { cleanURL } from "@/utils/cleanURL";

const PostGallary = ({ images }: { images: string[] }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  // const cleanedImages = images?.map(cleanURL);

  // if (cleanedImages.length <= 0) {
  //   return <>Post gallery Now Found</>;
  // }
  // console.log(cleanedImages);
  return (
    <>
      <LightGallery
        elementClassNames={` w-full h-full grid ${images?.length == 1 ? "grid-cols-1" : " grid-cols-2"}`}
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {images?.map((image, index) => (
          <a className=" relative h-full w-full" key={index} href={image}>
            {/* <Image
              className="rounded-none"
              width={200}
              height={200}
              style={{ objectFit: "cover" }}
              alt="NextUI hero Image"
              src={image}
            /> */}
            <img
              className=" w-full h-full object-cover rounded-none"
              src={image}
              alt=""
            />
          </a>
        ))}
      </LightGallery>
    </>
  );
};

export default PostGallary;
