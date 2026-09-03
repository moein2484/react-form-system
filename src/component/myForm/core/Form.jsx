"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "./FormProvider";

export default function Form({
  children,
  schema,
  type = "normal",
  validationMode = "onBlur",
  onSubmit,
  defaultValues = {},
  className,
}) {
  // اگر schema ارائه شد، از آن استفاده می‌کنیم
  // در غیر این صورت، از validation در سطح Field استفاده می‌شود
  const resolver = schema ? zodResolver(schema) : undefined;

  const formMethods = useForm({
    resolver,
    defaultValues,
    mode: validationMode,
    reValidateMode: validationMode,
  });

  const { handleSubmit, formState, control, reset, setValue, getValues, watch } = formMethods;

  const formType = type;

  const scrollToFirstError = (errors) => {
    const firstKey = Object.keys(errors || {})[0];
    if (!firstKey) return;
    const escape = typeof CSS !== "undefined" && CSS.escape ? CSS.escape : (s) => s;
    const el = document.querySelector(`[data-form-field="${escape(firstKey)}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = el.querySelector("input, select, textarea, button");
      focusable?.focus?.({ preventScroll: true });
    }
  };

  const submitHandler = handleSubmit(
    async (data) => {
      if (onSubmit) {
        await onSubmit(data);
      }
    },
    (errors) => {
      // در حالت عادی، بعد از ارسال به اولین فیلد خطادار اسکرول کن
      if (formType !== "strict") {
        scrollToFirstError(errors);
      }
    },
  );

  return (
    <FormProvider
      control={control}
      formState={formState}
      type={formType}
      validationMode={validationMode}
      submitHandler={submitHandler}
      reset={reset}
      setValue={setValue}
      getValues={getValues}
      watch={watch}
    >
      <form onSubmit={submitHandler} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
