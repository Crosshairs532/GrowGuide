"use client";

import LoadingOverlay from "../../UI/LoadingOverlay";
import GGForm from "@/components/Form/GGForm";
import GGInput from "@/components/Form/GGInput";
import { useResetPassword } from "@/hooks/useResetPassword";
import { resetPasswordService } from "@/services/authService/auth.service";
import { Button } from "@nextui-org/button";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

const PasswordReset = ({ searchParams }: { searchParams: any }) => {
  const { email, accessToken } = searchParams;

  console.log(email, "search");

  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();
  const router = useRouter();

  const onSubmit: SubmitHandler<any> = (data: any) => {
    resetPassword({ ...data, email });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      console.log("reset");
      router.replace("/login");
    }
  }, [isSuccess, isPending]);
  return (
    <>
      {isPending && <LoadingOverlay isPending={isPending}></LoadingOverlay>}
      <div className=" flex flex-col space-y-5 justify-center items-center border-2 h-screen">
        <h1 className="text-[#e7e9ea] text-[2vw]">Reset Password</h1>
        <div className=" border-2 w-[30%] space-y-4">
          <GGForm onSubmit={onSubmit}>
            <div className=" space-y-4">
              <GGInput type="password" label="Password" name="password" />
              <Button className=" mx-auto w-[70%]" type="submit">
                Reset Password
              </Button>
            </div>
          </GGForm>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
