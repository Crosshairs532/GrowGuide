import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "./editorOptions";
import { useFormContext } from "react-hook-form";

const QuizEditor = ({ description }: { description: string }) => {
  const [value, setValue] = useState(description);
  const { register } = useFormContext();

  const modules = {
    toolbar: toolbarOptions,
  };

  console.log(value);
  return (
    <ReactQuill
      {...register("description")}
      modules={modules}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};
export default QuizEditor;
