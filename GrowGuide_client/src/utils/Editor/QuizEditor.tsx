"use client";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./editorOptions";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";

const QuizEditor = ({
  description = "",
  placeholder = "",
}: {
  placeholder: string;
  description: string;
}) => {
  const [value, setValue] = useState(description);
  const { setValue: setFormValue, getValues, register } = useFormContext();

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleChange = (content: string) => {
    setValue(content);
    setFormValue("description", content); // Manually set form value
  };

  const handleBlur = () => {
    // You can trigger form validations here or handle focus loss if needed
    setFormValue("description", value); // Ensure value is still saved on blur
  };

  return (
    <ReactQuill
      modules={modules}
      placeholder={placeholder}
      theme="snow"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur} // Manually handle blur event
      className="bg-white border-none text-[#1C9BEF]"
    />
  );
};

export default QuizEditor;
