/* eslint-disable prettier/prettier */
"use client";
import React, { useEffect, useState } from "react";
import { useGrowContext } from "@/app/Context/GrowContext";
import {
  Avatar,
  Button,
  Image,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
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
  onClose,
}: {
  onSubmit: SubmitHandler<any>;
  post: any;
  onClose: any;
}) => {
  // const [image, setImage] = useState<string[] | File[] | undefined[]>([]);
  // const [profilePicture, setProfilePicture] = useState<any[]>([]);
  // const [AlreadyPostedImages, setAlreadyPostedImages] = useState<string[]>([]);
  // const [categoriesEdit, setCategoriesEdit] = useState(
  //   new Set([...post.categories])
  // );
  // const [categoriesEdit, setCategoriesEdit] = useState<Set<string>>(
  //   new Set(post.categories)
  // );

  // !new
  const [image, setImage] = useState<(string | File)[]>([]);
  const [profilePicture, setProfilePicture] = useState<any[]>([]);
  const [alreadyPostedImages, setAlreadyPostedImages] = useState<string[]>([]);
  const [categoriesEdit, setCategoriesEdit] = useState<Set<string>>(
    new Set(post?.categories)
  );

  console.log(categoriesEdit);

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

  useEffect(() => {
    console.log(post?.images);
    if (post?.images) {
      setAlreadyPostedImages(post?.images);
    }
    console.log(alreadyPostedImages);
  }, [post]);

  const handleRemoveImages = (data: { image: string; index: number }) => {
    if (alreadyPostedImages?.includes(data.image)) {
      setAlreadyPostedImages((prevPostedImages) =>
        prevPostedImages.filter((img) => img !== data.image)
      );
    } else {
      // setImage((prevImages) => prevImages.filter((img) => img !== data.image));
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
    const postEditImages = [...alreadyPostedImages, ...image];
    const categoriesAndDescription = { ...data };
    const editedData = {
      images: postEditImages,
      data: categoriesAndDescription,
    };

    console.log({ editedData });
    onSubmit(editedData);
    onClose();
  };

  const handleSelectionChange = (keys: any) => {
    const newSet = new Set<string>(
      Array.isArray(keys) ? keys : Array.from(keys)
    );
    setCategoriesEdit(newSet);
  };

  console.log(alreadyPostedImages, profilePicture);
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleformSubmit)} action="">
          <div className=" profile flex gap-2">
            <Avatar src={post?.user?.image} />

            <div className=" flex flex-col">
              <p>{post?.user?.name}</p>
              <small>{user?.email}</small>
            </div>
          </div>
          <div className="description">
            <div className=" py-3">
              <QuizEditor
                placeholder="Edit Comment"
                description={post?.description}
              />
            </div>
            <div className=" w-full flex gap-1 text-balance break-words flex-wrap">
              {Array.from(categoriesEdit).map((cc, idx) => (
                <p key={idx} className="">
                  #{cc}
                </p>
              ))}
            </div>

            <Select
              {...methods.register("categories")}
              defaultSelectedKeys={[...post?.categories]}
              selectedKeys={categoriesEdit}
              onSelectionChange={handleSelectionChange}
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
            {alreadyPostedImages?.length > 0 ? (
              alreadyPostedImages?.map((image: string, index: number) => {
                return (
                  <div key={index} className=" relative">
                    <Button
                      onClick={() => handleRemoveImages({ image, index })}
                      className=" z-20 absolute right-2 rounded-full"
                    >
                      <X />
                    </Button>
                    <Skeleton
                      isLoaded={!(alreadyPostedImages.length > 0) || true}
                      className="rounded-lg"
                    >
                      <Image
                        key={index}
                        width={200}
                        height={200}
                        alt="NextUI hero Image with delay"
                        src={`${image}`}
                      />
                    </Skeleton>
                  </div>
                );
              })
            ) : (
              <small>No Images</small>
            )}

            {profilePicture?.length > 0 &&
              profilePicture?.map((img, index) => (
                <div key={index} className=" relative previewImage">
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
              <label
                className=" text-[#a1a1aa] text-center "
                htmlFor="imageEdit"
              >
                Upload Image
              </label>
              <input
                onChange={(e) => handleImageChange(e)}
                className="hidden"
                type="file"
                name=""
                id="imageEdit"
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
