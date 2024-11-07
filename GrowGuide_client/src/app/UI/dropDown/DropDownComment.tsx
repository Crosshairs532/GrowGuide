/* eslint-disable prettier/prettier */
import { useCommentUpdate } from "@/hooks/useCommentUpdate";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Delete, Pencil } from "lucide-react";
import React, { ReactNode, useState } from "react";

const DropDownComment = ({
  children,
  editPost,
  post,
  commenterId,
  comment,
}: {
  editPost: any;
  children: ReactNode;
  post: any;
  commenterId: string;
  comment: any;
}) => {
  const [action, setAction] = useState();
  const { mutate: commentUpdate } = useCommentUpdate();

  const items = [
    { key: "edit", label: "Edit file", cp: <Pencil /> },
    { key: "delete", label: "Delete file", cp: <Delete /> },
  ];

  const handleSelect = (item: any) => {
    switch (item) {
      case "edit":
        editPost(post, comment);
        break;
      case "delete":
        commentUpdate({ action: item, commentId: comment?._id });
        break;
    }
  };
  return (
    <Dropdown>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        closeOnSelect={true}
        items={items}
        onAction={(item) => handleSelect(item)}
      >
        {(item) => (
          <DropdownItem
            startContent={item.cp}
            color={`${item.key === "delete" ? "danger" : "default"}`}
            className={`${item.key === "delete" ? "text-danger" : ""}`}
            key={item.key}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDownComment;
