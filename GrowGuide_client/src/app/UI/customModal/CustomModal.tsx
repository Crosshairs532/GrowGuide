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

import PostEditForm from "../post/PostEditForm";
import { usePostUpdate } from "@/hooks/usePostUpdate";

export default function CustomModal({
  post,
  children,
  isOpen,
  onOpenChange,
}: any) {
  const { mutate: postDelete } = usePostDelete();
  const { mutate: updatePost } = usePostUpdate();

  const handleDelete = (id: any) => {
    console.log(id);
    postDelete(id);
  };

  const onSubmit = (data: any) => {
    // console.log(data.images);
    const imagesCloud = data.images.filter(
      (image: any) => typeof image == "string"
    );

    const imageObject = data?.images.filter(
      (image: any) => typeof image == "object"
    );

    const postData = {
      ...data?.data,
      images: [...imagesCloud],
      post: post,
    };

    console.log({ postData });

    const formData = new FormData();

    formData.append("data", JSON.stringify(postData));

    console.log(imageObject, imageObject.length);
    if (imageObject) {
      imageObject.forEach((file: File) => {
        formData.append("file", file);
      });
    }

    // const postInformation = { postId: post?._id, formData };

    updatePost(formData);
  };

  return (
    <Modal
      scrollBehavior={"inside"}
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{
        base: "",
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-center items-center gap-1">
              {children === "delete"
                ? "Delete Post"
                : children === "edit"
                  ? "Edit Post"
                  : ""}
            </ModalHeader>
            <Divider className="my-4" />
            <ModalBody className="">
              {children === "delete" ? (
                "Do You want to Delete the post?"
              ) : children === "edit" ? (
                // <PostProvider onSubmit={onSubmit}>
                <PostEditForm onSubmit={onSubmit} post={post}></PostEditForm>
              ) : (
                // </PostProvider>
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
                ""
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
