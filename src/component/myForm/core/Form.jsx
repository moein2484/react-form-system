"use client";

import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "./FormProvider";

export default function Form({
  children,
  schema: _legacySchema,
  resolver: _legacyResolver,
  type = "normal",
  validationMode = "onBlur",
  onSubmit,
  defaultValues = {},
  className,
  id,
  ...rest
}) {
  const formMethods = useForm({
    defaultValues,
    mode: type === "strict" ? "onChange" : validationMode,
    reValidateMode: type === "strict" ? "onChange" : validationMode,
    shouldFocusError: false,
  });

  const { handleSubmit, formState, control, reset, setValue, getValues, watch, trigger } = formMethods;

  const formRef = useRef(null);

  // همگام‌سازی وضعیت اعتبارسنجی با DOM تا دکمه‌های خارجی (متصل با id) هم از خطا مطلع شوند
  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const errorCount = Object.keys(formState.errors).length;
    el.dataset.formErrors = String(errorCount);
    el.dataset.formValid = String(formState.isValid);
    el.dataset.formType = type;
    el.resetForm = reset;
    el.dataset.formSubmitting = String(Boolean(formState.isSubmitting));
    if (id) {
      window.dispatchEvent(
        new CustomEvent("form:statechange", {
          detail: {
            formId: id,
            hasErrors: errorCount > 0,
            valid: formState.isValid,
            type,
            submitting: Boolean(formState.isSubmitting),
          },
        }),
      );
    }
    return () => { delete el.resetForm; };
  }, [formState, id, type, reset]);

  const formType = type;

  const scrollToFirstError = (errors) => {
    const fields = formRef.current?.querySelectorAll("[data-form-field]") || [];
    const el = Array.from(fields).find((node) => {
      const path = node.dataset.formField.replace(/\[(\d+)\]/g, ".$1").split(".");
      return path.reduce((value, key) => value?.[key], errors);
    });
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = el.querySelector('input:not([type="hidden"]):not([type="file"]):not(:disabled), select:not(:disabled), textarea:not(:disabled), button:not(:disabled), [tabindex="0"]');
      focusable?.focus?.({ preventScroll: true });
    }
  };

  const submitHandler = (event) => handleSubmit(
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
  )(event);

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
      trigger={trigger}
    >
      <form {...rest} id={id} ref={formRef} onSubmit={submitHandler} className={className} noValidate>
        {children}
      </form>
    </FormProvider>
  );
}
