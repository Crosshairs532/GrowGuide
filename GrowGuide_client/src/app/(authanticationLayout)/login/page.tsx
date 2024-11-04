"use client";
import LoadingOverlay from "@/app/UI/LoadingOverlay";
import ForgetModal from "@/app/UI/Modal";
import GGForm from "@/components/Form/GGForm";
import GGInput from "@/components/Form/GGInput";
import { useLogin } from "@/hooks/useLogin";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { SubmitHandler } from "react-hook-form";

const Login = () => {
  const searchParam = useSearchParams();
  const redirecturl = searchParam?.get("redirect");
  const { mutate: loginMutation, isPending, isSuccess, isError } = useLogin();
  const onSubmit: SubmitHandler<any> = (data) => {
    loginMutation(data);
  };
  const router = useRouter();

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirecturl) {
        router.push(redirecturl);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <LoadingOverlay isPending={isPending}></LoadingOverlay>}
      <div className=" flex justify-center items-center h-screen">
        <div className=" form w-[80vw] sm:w-[50vw] lg:w-[35vw]">
          <h1 className=" font-chirpBold space-y-5 text-[4vw] text-[#E6E9EA]">
            Grow Guide
          </h1>
          <GGForm onSubmit={onSubmit}>
            <div className=" space-y-3">
              <div className=" space-y-3">
                <GGInput type="email" label="Email" name="email" />
                <GGInput type="password" label="Password" name="password" />
              </div>
              <div className=" flex justify-between items-center">
                <ForgetModal>
                  <small className=" text-[#e7e9eA] mt-1 ">
                    Forget Password?
                  </small>
                </ForgetModal>
                <Link href={"/registration"}>
                  <small className=" text-[#e7e9eA] mt-1 ">
                    Do not have any account?
                  </small>
                </Link>
              </div>

              <Button type="submit" className=" w-full">
                Login
              </Button>
            </div>
          </GGForm>
          {isError && <p className=" text-red-400">user does not exists!</p>}
        </div>
      </div>
    </>
  );
};
const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
