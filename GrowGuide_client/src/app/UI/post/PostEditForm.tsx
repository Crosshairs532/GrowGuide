"use client";
import React, { useEffect, useState } from "react";
import { useGrowContext } from "@/app/Context/GrowContext";
import { Avatar, Button, Image, Select, SelectItem } from "@nextui-org/react";
import { X } from "lucide-react";
import { categories } from "../../../../public/category";

import QuizEditor from "@/utils/Editor/QuizEditor";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
const PostEditForm = ({
  onSubmit,
  post,
}: {
  onSubmit: SubmitHandler<any>;
  post: any;
}) => {
  const [image, setImage] = useState<string[] | File[] | undefined[]>([]);
  const [profilePicture, setProfilePicture] = useState<any[]>([]);
  const [AlreadyPostedImages, setAlreadyPostedImages] = useState<string[]>([]);
  const [categoriesEdit, setCategoriesEdit] = useState(
    new Set([...post.categories])
  );

  const user = useGrowContext();
  const methods = useForm();
  // const { register, handleSubmit } = useFormContext();

  const handleImageChange = (e: any) => {
    const file = e.target.files![0];
    setImage((prev) => [...prev, file]);
    // console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (post.images) {
      setAlreadyPostedImages([...post.images]);
    }
  }, [post]);

  const handleRemoveImages = (data: { image: string; index: number }) => {
    if (AlreadyPostedImages.includes(data.image)) {
      setAlreadyPostedImages((prevPostedImages) =>
        prevPostedImages.filter((img) => img !== data.image)
      );
    } else {
      setImage((prevPostedImages) =>
        prevPostedImages.filter((img) => img !== data.image)
      );

      setProfilePicture((prevPostedImages) =>
        prevPostedImages.filter((img) => img !== data.image)
      );
    }
  };

  console.log(Array.from(categoriesEdit));

  const handleformSubmit = (data: any) => {
    const postEditImages = [...AlreadyPostedImages, ...image];
    const categoriesAndDescription = { ...data };
    const editedData = {
      images: postEditImages,
      data: categoriesAndDescription,
    };

    onSubmit(editedData);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleformSubmit)} action="">
          <div className=" profile flex gap-2">
            <Avatar src={post.user.image} />

            <div className=" flex flex-col">
              <p>{post.user?.name}</p>
              <small>{user?.email}</small>
            </div>
          </div>
          <div className="description">
            <div className=" py-3">
              <QuizEditor description={post.description} />
            </div>
            <div className=" w-full flex gap-1 text-balance break-words flex-wrap">
              {Array.from(categoriesEdit).map((cc) => (
                <p className="">#{cc}</p>
              ))}
            </div>

            <Select
              {...methods.register("categories")}
              defaultSelectedKeys={[...post.categories]}
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
            {AlreadyPostedImages.map((image: string, index: number) => {
              return (
                <div className=" relative">
                  <Button
                    onClick={() => handleRemoveImages({ image, index })}
                    className=" z-20 absolute right-2 rounded-full"
                  >
                    <X />
                  </Button>
                  <Image
                    key={index}
                    width={200}
                    height={200}
                    alt="NextUI hero Image with delay"
                    src={`https://app.requestly.io/delay/5000/${image}`}
                  />
                </div>
              );
            })}

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
            <Button type="submit" color="primary">
              save post
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PostEditForm;
