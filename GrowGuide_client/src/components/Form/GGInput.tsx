import React from "react";
import { Input } from "@nextui-org/input";

interface TInput {
  type: string;
  label: string;
  variant: "flat" | "bordered" | "underlined" | "faded";
}

const GGInput = ({ type, label, variant }: TInput) => {
  return <Input required variant={variant} type={type} label={label} />;
};

export default GGInput;
