"use client";
import GGForm from "@/components/Form/GGForm";
import Logo from "@/utils/Icons/Logo";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div className=" Logo">
        <Logo />
      </div>
      <div className=" Form">
        <GGForm></GGForm>
      </div>
    </div>
  );
};

export default LoginPage;
