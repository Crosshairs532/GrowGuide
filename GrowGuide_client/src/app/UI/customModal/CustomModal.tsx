"use client";
import { usePostDelete } from "@/hooks/usePostDelete";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";

import { Children } from "react";
import PostEditForm from "../post/PostEditForm";

export default function CustomModal({ post, children, isOpen, onOpenChange }) {
  const { mutate: postDelete } = usePostDelete();

  const handleDelete = (id: string) => {
    console.log(id);
    postDelete(id);
  };
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex  justify-center items-center gap-1">
              {children === "delete"
                ? "Delete Post"
                : children === "edit"
                  ? "Edit Post"
                  : ""}
            </ModalHeader>
            <Divider className="my-4" />
            <ModalBody>
              {children === "delete" ? (
                "Do You want to Delete the post?"
              ) : children === "edit" ? (
                <PostEditForm post={post}></PostEditForm>
              ) : (
                ""
              )}
            </ModalBody>
            <ModalFooter>
              {children === "delete" ? (
                <Button
                  onClick={() => {
                    handleDelete(post?._id);
                    onClose();
                  }}
                  color="danger"
                  variant="light"
                >
                  Delete
                </Button>
              ) : (
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              )}
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
