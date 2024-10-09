"use client";
import ForgetModal from "@/app/UI/Modal";
import GGForm from "@/components/Form/GGForm";
import GGInput from "@/components/Form/GGInput";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

const LoginPage = () => {
  const { mutate: loginMutation, isPending, isSuccess } = useLogin();
  const onSubmit: SubmitHandler<any> = (data) => {
    loginMutation(data);
  };
  const router = useRouter();

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isPending, isSuccess]);
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" form w-[80vw] sm:w-[50vw] lg:w-[35vw]">
        <GGForm onSubmit={onSubmit}>
          <div className=" space-y-3">
            <div className=" space-y-3">
              <GGInput type="email" label="Email" name="email" />
              <GGInput type="password" label="Password" name="password" />
            </div>
            <ForgetModal>
              <small className=" text-[#e7e9eA] mt-1 ">Forget Password?</small>
            </ForgetModal>
            <Button type="submit" className=" w-full">
              Login
            </Button>
          </div>
        </GGForm>
      </div>
    </div>
  );
};

export default LoginPage;
