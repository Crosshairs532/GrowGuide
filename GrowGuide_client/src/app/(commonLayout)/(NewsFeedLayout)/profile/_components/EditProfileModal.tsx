"use client";
import React, { ReactNode, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Avatar,
  Image,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/utils/Icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/utils/Icons/EyeFilledIcon";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";

const EditProfileModal = ({ CurrentUser }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = React.useState(false);
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState<string | File | undefined>();
  const [profilePicture, setProfilePicture] = useState();
  const { mutate: updateProfile, isPending } = useProfileUpdate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  //   !image input
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
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    if (image) {
      formData.append("file", image);
    }

    console.log(data);

    updateProfile(formData);
  };

  return (
    <div>
      <Button
        isDisabled={!CurrentUser}
        onPress={onOpen}
        className=" relative font-chirpMedium rounded-full right-5 text-[15px] border border-[#536371] bg-transparent hover:bg-[#181919]"
      >
        Edit profile
      </Button>

      <Modal
        size="xl"
        className=" border-2 w-full"
        backdrop="blur"
        classNames={{
          base: "bg-[#000000]",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                className=" space-y-4"
                onSubmit={handleSubmit(onSubmit)}
                action=""
              >
                <ModalHeader className="flex font-chirpBold flex-col gap-1">
                  Edit Profile
                </ModalHeader>
                <ModalBody>
                  <div className=" relative">
                    <div className="cover"></div>
                    <div className=" w-fit h-fit rounded-full relative profile">
                      <label htmlFor="image">
                        <div className=" flex justify-center items-center absolute rounded-full z-20 bg-black/30 inset-0 top-0 w-full h-full">
                          <Camera />
                        </div>
                      </label>
                      <input
                        onChange={(e) => handleImageChange(e)}
                        className="hidden"
                        type="file"
                        name=""
                        id="image"
                      />

                      <Image
                        className=" rounded-full"
                        width="100"
                        height="100"
                        src={
                          profilePicture ? profilePicture : CurrentUser?.image
                        }
                      />
                    </div>
                  </div>

                  <Input
                    radius="none"
                    {...register("name")}
                    defaultValue={CurrentUser?.name ? CurrentUser.name : ""}
                    classNames={{
                      label: ["font-chirpBold"],
                      input: [
                        " bg-transparent font-chirpRegular text-blue-500",
                        "placeholder:text-[#71767A]",
                        "",
                      ],
                      innerWrapper: [],
                    }}
                    type="name"
                    variant="bordered"
                    label="Name"
                  />
                  <Input
                    isDisabled={true}
                    radius="none"
                    {...register("email")}
                    defaultValue={CurrentUser?.email ? CurrentUser?.email : ""}
                    classNames={{
                      label: ["font-chirpBold"],
                      input: [
                        " bg-transparent font-chirpRegular text-blue-500",
                        "placeholder:text-[#71767A]",
                        "",
                      ],
                      innerWrapper: [],
                    }}
                    type="email"
                    variant="bordered"
                    label="Email"
                  />
                  <Input
                    radius="none"
                    {...register("password")}
                    defaultValue={
                      CurrentUser?.password ? CurrentUser?.password : ""
                    }
                    classNames={{
                      label: ["font-chirpBold"],
                      input: [
                        " bg-transparent text-blue-500 font-chirpBold ",
                        "placeholder:text-[#71767A]",
                        "",
                      ],
                      innerWrapper: [],
                    }}
                    variant="bordered"
                    label="Password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    className=" font-chirpBold"
                    color="primary"
                    onPress={onClose}
                  >
                    save
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
