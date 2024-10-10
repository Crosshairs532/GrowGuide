"use client";
import React, { useState } from "react";
import { useGrowContext } from "@/app/Context/GrowContext";
import { Avatar, Image } from "@nextui-org/react";

const PostEditForm = ({ post }: { post: any }) => {
  const [image, setImage] = useState<string[] | File[] | undefined[]>([]);
  const [profilePicture, setProfilePicture] = useState<any[]>([]);
  const user = useGrowContext();
  const handleImageChange = (e: any) => {
    const file = e.target.files![0];
    setImage((prev) => [...prev, file]);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className=" profile flex gap-2">
        <Avatar src={post.user.image} />
        <div className=" flex flex-col">
          <p>{post.user?.name}</p>
          <small>{user?.email}</small>
        </div>
      </div>
      <div className="description">
        <p>{post.description}</p>
      </div>

      <div className="  border-2 grid grid-cols-2">
        {post?.images?.map((image: string, index: number) => {
          return (
            <Image
              key={index}
              width={200}
              height={200}
              alt="NextUI hero Image with delay"
              src={`https://app.requestly.io/delay/5000/${image}`}
            />
          );
        })}
        {profilePicture &&
          profilePicture.map((img) => (
            <div className=" previewImage">
              <div className="relative size-48 mx-auto w-full rounded-xl border-2 border-dashed border-default-300 p-2">
                <img
                  alt="item"
                  className="h-full w-full object-contain object-center rounded-md"
                  src={img}
                />
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="min-w-fit flex justify-start px-3 items-center bg-transparent border-2 rounded-lg border-[#3f3f45] flex-1">
          <label className=" text-[#a1a1aa] text-center " htmlFor="image">
            Upload Image
          </label>
          <input
            onChange={(e) => handleImageChange(e)}
            className="hidden"
            type="file"
            name=""
            id="image"
          />
        </div>
      </div>
    </div>
  );
};

export default PostEditForm;
