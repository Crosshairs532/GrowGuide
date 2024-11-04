/* eslint-disable prettier/prettier */
import { useForgetPassword } from "@/hooks/useForgetPassword";
import { MailIcon } from "@/utils/Icons/MainIcon";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgetModal = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: forgetPassword } = useForgetPassword();
  const { handleSubmit, register, reset } = useForm();

  const onSubmit: SubmitHandler<any> = (data: { email: string }) => {
    forgetPassword(data);
    reset();
  };

  return (
    <>
      <div role="button" tabIndex={0} onClick={onOpen}>
        {children}
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(onSubmit)} action="">
                <ModalHeader className="flex flex-col items-center gap-1">
                  Send Reset Password Link
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="email"
                    autoFocus
                    endContent={
                      <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    {...register("email")}
                    placeholder="Enter your email"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="submit"
                    color="success"
                    variant="flat"
                    onPress={onClose}
                  >
                    Send Email
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgetModal;
