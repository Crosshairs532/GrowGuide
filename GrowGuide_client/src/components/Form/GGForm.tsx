import React, { FormEventHandler, ReactNode } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

interface TForm {
  children: ReactNode;
  defaultValues?: any;
}

const GGForm = ({ children, defaultValues }: TForm) => {
  const methods = useForm();
  let formconfig: FormEventHandler = {};
  if (defaultValues) {
    formconfig["defaultValues"] = defaultValues;
  }

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default GGForm;
