import React, { FormEventHandler, ReactNode } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";

interface TForm {
  children: ReactNode;
  defaultValues?: Record<string, unknown>;
  onSubmit: SubmitHandler<any>;
}

interface TFormConfig {
  defaultValues?: Record<string, unknown>;
}

const GGForm = ({ children, defaultValues, onSubmit }: TForm) => {
  let formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default GGForm;
