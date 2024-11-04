/* eslint-disable prettier/prettier */
import { EyeFilledIcon } from "@/utils/Icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/utils/Icons/EyeSlashFilledIcon";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const GGPassword = ({ name }: { name: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { register } = useFormContext();

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Input
      {...register(name)}
      className=" text-[#E7E9EA] "
      color="default"
      label="Password"
      variant="bordered"
      placeholder="Enter your password"
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
  );
};

export default GGPassword;
