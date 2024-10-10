import React, { ReactNode, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import CustomModal from "../customModal/CustomModal";
import { Copy, Delete, Pencil } from "lucide-react";
import { usePostDelete } from "@/hooks/usePostDelete";

const DropDown = ({ children, post }: { children: ReactNode; post: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalContent, setModalContent] = useState("");

  const items = [
    { key: "copy", label: "Copy link", cp: <Copy /> },
    { key: "edit", label: "Edit file", cp: <Pencil /> },
    { key: "delete", label: "Delete file", cp: <Delete /> },
  ];

  const handleSelect = (item: any) => {
    console.log(item);
    setModalContent(item);
    onOpen();
  };

  return (
    <>
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

      <CustomModal post={post} isOpen={isOpen} onOpenChange={onOpenChange}>
        {modalContent}
      </CustomModal>
    </>
  );
};

export default DropDown;
