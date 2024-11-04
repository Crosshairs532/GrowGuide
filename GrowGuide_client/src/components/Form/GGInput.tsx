/* eslint-disable prettier/prettier */
"use client";
import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TInput {
  type: string;
  label: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  name: string;
  size?: "md" | "sm" | "lg" | undefined;
}

const GGInput = ({
  type,
  label,
  variant = "bordered",
  name,
  size = "md",
}: TInput) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Input
        {...register(name, {
          required: "This field is required",
        })}
        className=" text-[#E7E9EA]"
        color="default"
        size={size}
        variant={variant}
        type={type}
        label={label}
        errorMessage={errors?.name && (errors.name.message as string)}
      />
      {errors && <small>{errors.name?.message as string}</small>}
    </>
  );
};

export default GGInput;
