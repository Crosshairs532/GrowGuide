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
  const { register } = useFormContext();

  return (
    <Input
      {...register(name)}
      className=" text-[#E7E9EA]"
      color="default"
      size={size}
      required
      variant={variant}
      type={type}
      label={label}
    />
  );
};

export default GGInput;
