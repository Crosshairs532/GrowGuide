"use client";
import React, { useEffect, useState } from "react";
import { useGrowContext } from "@/app/Context/GrowContext";
import { Avatar, Button, Select, SelectItem } from "@nextui-org/react";
import { Image, ImageIcon, X } from "lucide-react";

import QuizEditor from "@/utils/Editor/QuizEditor";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { categories } from "../../../../../../public/category";
import { usePostCreate } from "@/hooks/useCreatePost";
const MakePost = () => {
  const [image, setImage] = useState<(string | File)[]>([]);
  const [profilePicture, setProfilePicture] = useState<any[]>([]);
  const [categoriesEdit, setCategoriesEdit] = useState(new Set([]));
  const { mutate: postCreate } = usePostCreate();

  const user = useGrowContext();
  const methods = useForm();

  const handleImageChange = (e: any) => {
    const file = e.target.files![0];
    setImage((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImages = (data: {
    image: string | File;
    index: number;
  }) => {
    setImage((prevPostedImages) =>
      prevPostedImages.filter((img) => img !== data.image)
    );
    setProfilePicture((prevPostedImages) =>
      prevPostedImages.filter((img) => img !== data.image)
    );
  };

  const handleformSubmit = (data: any) => {
    const postEditImages = [...image];
    const { categories } = data;
    const categoriesAndDescription = {
      ...data,
      categories: categories.split(","),
    };
    const editedData = {
      ...categoriesAndDescription,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(editedData));
    if (postEditImages) {
      postEditImages.forEach((image: any) => {
        formData.append("file", image);
      });

      console.log(editedData);

      postCreate(formData);
    }
  };

  return (
    <div className="">
      <FormProvider {...methods}>
        <form
          className=" border-2 py- px-5 gap-5 flex"
          onSubmit={methods.handleSubmit(handleformSubmit)}
          action=""
        >
          <div className=" profile flex gap-2">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </div>
          <div className=" flex-1">
            <div className=" description">
              <div className=" py-3">
                <QuizEditor description="" placeholder="What is happening ?" />
              </div>
              <div className=" w-full flex gap-1 text-balance break-words flex-wrap"></div>

              <Select
                {...methods.register("categories")}
                SelectedKeys={categoriesEdit}
                onSelectionChange={setCategoriesEdit}
                variant="underlined"
                label="Choose Category"
                selectionMode="multiple"
                className=" w-full"
                size="md"
              >
                {categories?.map((category: { key: string; label: string }) => (
                  <SelectItem key={category.key}>{category.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className=" my-4 grid gap-2 grid-cols-2">
              {profilePicture &&
                profilePicture.map((img, index) => (
                  <div className=" relative previewImage">
                    <Button
                      className=" z-20 absolute right-2 rounded-full"
                      onClick={() => handleRemoveImages({ image: img, index })}
                    >
                      <X />
                    </Button>
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
            <div className=" flex justify-between items-center">
              <div className=" min-w-fit flex justify-start px-3 items-center bg-transparent rounded-lg border-[#3f3f45] ">
                <label className=" text-[#a1a1aa] text-center " htmlFor="image">
                  <ImageIcon color="#1C9BEF" size={25} />
                </label>
                <input
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                  type="file"
                  name=""
                  id="image"
                />
              </div>
              <Button className=" font-chirpBold" type="submit" color="primary">
                post
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MakePost;
