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

const PostGallary = ({ image }: { image: string }) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <div className=" flex">
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        <a href={image}>
          <Image
            className="w-full rounded-none"
            fill
            style={{ objectFit: "cover" }}
            alt="NextUI hero Image"
            src={image}
          />
        </a>
        <a href={image}>
          <Image
            className="w-full rounded-none"
            fill
            style={{ objectFit: "cover" }}
            alt="NextUI hero Image"
            src={image}
          />
        </a>
        ...
      </LightGallery>
      <div className=" comments">
        <h1> comments</h1>
      </div>
    </div>
  );
};

export default PostGallary;
