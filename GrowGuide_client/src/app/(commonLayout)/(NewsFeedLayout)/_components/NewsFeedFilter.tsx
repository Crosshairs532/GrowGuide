import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import React, { ReactNode, useState } from "react";
import { categories } from "../../../../../public/category";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const NewsFeedFilter = ({
  textual,
  children,
  setCategory,
  handleTextual,
}: {
  textual: string;
  children: ReactNode;
  setCategory: any;
  handleTextual: any;
}) => {
  const { register, handleSubmit } = useForm();

  return (
    <div className=" flex gap-6 items-center justify-between">
      <Input
        value={textual}
        onChange={handleTextual}
        classNames={{
          base: " w-full h-10",
          mainWrapper: "h-full",
          input: "text-small ",
          inputWrapper: "h-full font-normal text-default-500 ",
        }}
        variant="underlined"
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
      />
      <Select
        onSelectionChange={setCategory}
        variant="underlined"
        label="Search on Category"
        selectionMode="multiple"
        className=" w-full"
        size="sm"
      >
        {categories?.map((category: { key: string; label: string }) => (
          <SelectItem key={category.key}>{category.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default NewsFeedFilter;
