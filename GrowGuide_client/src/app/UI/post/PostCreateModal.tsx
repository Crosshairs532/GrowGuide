/* eslint-disable prettier/prettier */
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Feather } from "lucide-react";
import MakePost from "@/app/(commonLayout)/(NewsFeedLayout)/_components/MakePost";
const PostCreateModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onPress={() => onOpen()}
        className=" mx-auto sm:py-7 sm:px-4 sm:mt-4 md:h-10 md:w-10 lg:w-[90%] rounded-full hover:bg-[#188CD8] duration-200 bg-[#188CD8] text-[20px] font-chirpMedium"
      >
        <Feather className=" block lg:hidden" />
        <span className=" hidden lg:block">Post</span>
      </Button>

      <Modal backdrop="blur" onClose={onClose} isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <MakePost onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostCreateModal;
