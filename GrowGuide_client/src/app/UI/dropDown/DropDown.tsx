/* eslint-disable prettier/prettier */
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
import { useGrowContext } from "@/app/Context/GrowContext";

const DropDown = ({ children, post }: { children: ReactNode; post: any }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState("");
  const { user } = useGrowContext();

  const canEdit = user?._id == post?.user?._id;

  const items = [
    {
      key: "edit",
      label: "Edit file",
      cp: <Pencil />,
    },
    { key: "delete", label: "Delete file", cp: <Delete /> },
  ];

  const filteredItems = items.filter((item) => {
    if (item.key === "edit" || item.key === "delete") {
      return canEdit; // Show edit item only if canEdit is true
    }
    return true; // Always show delete item
  });

  console.log(filteredItems);

  const handleSelect = (item: any) => {
    setModalContent(item);
    console.log(item, modalContent);
    onOpen();
  };

  return (
    <>
      <Dropdown>
        <DropdownTrigger>{children}</DropdownTrigger>
        <DropdownMenu
          aria-label="Dynamic Actions"
          closeOnSelect={true}
          items={filteredItems}
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

      <CustomModal
        post={post}
        onClose={onClose}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {modalContent}
      </CustomModal>
    </>
  );
};

export default DropDown;
