import React, { useEffect } from "react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import fjGallery from "flickr-justified-gallery";
import Link from "next/link";
const ImageGalleryPost = ({ images }: { images: string[] }) => {
  useEffect(() => {
    fjGallery(document.querySelectorAll(".gallery"), {
      itemSelector: ".gallery__item",
      rowHeight: 180,
      lastRow: "start",
      gutter: 2,
      rowHeightTolerance: 0.1,
      calculateItemsHeight: false,
    });
  }, []);

  return (
    <LightGallery
      elementClassNames={`gallery h-auto w-full ${images.length === 1 && " grid grid-cols-1"} flex sm:flex-row flex-col`}
      speed={500}
      thumbnail={true}
      galleryId={"nature"}
      plugins={[lgThumbnail, lgZoom]}
    >
      {images?.map((image, index) => (
        <Link className=" w-full min-h-[10vh]" key={index} href={image}>
          <Image
            width={100}
            height={100}
            className="w-full h-full rounded-none"
            // fill
            style={{ objectFit: "cover" }}
            alt="NextUI hero Image"
            src={image}
          />
        </Link>
      ))}
    </LightGallery>
  );
};

export default ImageGalleryPost;
