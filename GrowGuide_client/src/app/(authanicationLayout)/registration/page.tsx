"use client";
import GGForm from "@/components/Form/GGForm";
import Logo from "@/utils/Icons/Logo";
import React from "react";

const RegistrationPage = () => {
  return (
    <div>
      <div className=" flex flex-col">
        <span className=" logo">
          <Logo />
        </span>
        <h1>Create your account</h1>
        <div>
          <GGForm></GGForm>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
