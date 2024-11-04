"use client";
import GGInput from "@/components/Form/GGInput";
import GGPassword from "@/components/Form/GGInputPassword";
import Logo from "@/utils/Icons/Logo";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { useRegistration } from "@/hooks/useRegistration";
import { redirect } from "next/navigation";
import LoadingOverlay from "@/app/UI/LoadingOverlay";
import Link from "next/link";

const RegistrationPage = () => {
  const [image, setImage] = useState<string | File | undefined>();
  const [profilePicture, setProfilePicture] = useState<
    string | ArrayBuffer | null
  >();
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useRegistration();
  const methods = useForm();

  const handleImageChange = (e: any) => {
    const file = e.target.files![0];
    setImage(file);
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    const userData = { role: "user", ...data };
    console.log(userData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(userData));
    if (image) {
      formData.append("file", image);
    }

    console.log(formData.get("data"));
    console.log(formData.get("file"));
    handleUserRegistration(formData);
  };

  useEffect(() => {
    if (isSuccess && !isPending) {
      redirect("/login");
    }
  }, [isSuccess]);

  return (
    <>
      {/* {isPending &&  isPending={isPending}></>} */}
      {isPending && <LoadingOverlay isPending={isPending}></LoadingOverlay>}

      <div className=" mx-auto flex flex-col sm:flex-row lg:flex-row justify-center space-y-[4vw] sm:justify-around lg:justify-around items-center h-screen">
        <div className="  icon lg:w-[50%]">
          <div className="  w-fit mx-auto">
            <Logo width="250" height="250" />
          </div>
        </div>
        <div className=" lg:w-[50%]  flex flex-col justify-center  w-full items-center sm:items-start form-content">
          <div className="  w-[90%]">
            <div className=" sm:block hidden text-[#E7E9EA]">
              <h1 className=" font-chirpBold lg:text-[5vw] sm:text-[5vw]">
                GrowGuide
              </h1>
              <h1 className=" font-chirpBold text-[2vw]">Join Today.</h1>
            </div>
            <div className="form space-y-2 mt-4">
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className=" flex flex-col lg:flex-col space-y-[1.5vw] w-full">
                    <div className=" w-full flex gap-3 items-center">
                      <GGInput type="text" label="Name" name="name" />
                      <GGInput type="email" label="Email" name="email" />
                    </div>
                    <div className=" flex space-x-[2vw]">
                      <GGPassword name="password" />
                      <div className="min-w-fit flex justify-start px-3 items-center bg-transparent border-2 rounded-lg border-[#3f3f45] flex-1">
                        <label
                          className=" text-[#a1a1aa] text-center "
                          htmlFor="image"
                        >
                          Upload Image
                        </label>
                        <input
                          required={true}
                          onChange={(e) => handleImageChange(e)}
                          className="hidden"
                          type="file"
                          name=""
                          id="image"
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="md"
                    className=" bg-[#188CD8] mt-4 font-chirpMedium w-full"
                  >
                    Create Account
                  </Button>
                  <Link className=" text-[#1c74ef]" href={"/login"}>
                    Already have an account?
                  </Link>
                </form>
              </FormProvider>
              {profilePicture && (
                <div className=" previewImage">
                  <div className="relative size-48 mx-auto w-full rounded-xl border-2 border-dashed border-default-300 p-2">
                    <img
                      alt="item"
                      className="h-full w-full object-contain object-center rounded-md"
                      src={
                        typeof profilePicture === "string"
                          ? profilePicture
                          : undefined
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
