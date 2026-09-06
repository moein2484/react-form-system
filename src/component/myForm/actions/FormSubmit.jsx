"use client";

import { useEffect, useState } from "react";
import { useOptionalFormContext } from "../core/FormProvider";
import styles from "./Actions.module.css";

function useExternalFormState(formId) {
  const [state, setState] = useState({ hasErrors: false, submitting: false });

  useEffect(() => {
    if (!formId) return;

    const syncFromDom = () => {
      const formEl = document.getElementById(formId);
      if (!formEl) return;
      setState({
        hasErrors:
          formEl.dataset.formErrors === "true" ||
          Number(formEl.dataset.formErrors || 0) > 0,
        submitting: formEl.dataset.formSubmitting === "true",
      });
    };

    let raf = typeof window !== "undefined" ? requestAnimationFrame(syncFromDom) : 0;

    const handleStateChange = (e) => {
      if (!e.detail || e.detail.formId !== formId) return;
      setState({
        hasErrors: Boolean(e.detail.hasErrors),
        submitting: Boolean(e.detail.submitting),
      });
    };

    window.addEventListener("form:statechange", handleStateChange);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("form:statechange", handleStateChange);
    };
  }, [formId]);

  return state;
}

export default function FormSubmit({ children, className, style, form, ...rest }) {
  const context = useOptionalFormContext();
  const externalState = useExternalFormState(form);

  // خارج از <Form> — اتصال از طریق attribute توسّط `form`
  if (!context) {
    if (!form) {
      throw new Error(
        "FormSubmit خارج از Form استفاده شده است؛ برای اتصال به فرم باید prop «form» (شناسه‌ی فرم) را بدهید.",
      );
    }
    const { hasErrors, submitting } = externalState;
    return (
      <button
        type="submit"
        form={form}
        disabled={submitting}
        style={style}
        className={`${styles.submitButton} ${hasErrors ? styles.submitButtonError : ""} ${submitting ? styles.disabled : ""} ${className || ""}`}
        {...rest}
      >
        {submitting ? "در حال ارسال..." : children || "ارسال"}
      </button>
    );
  }

  const { type, formState } = context;

  const { isValid, isSubmitting } = formState;

  let disabled = false;

  if (type === "strict") {
    disabled = !isValid || isSubmitting;
  } else {
    disabled = isSubmitting;
  }

  return (
    <button
      type="submit"
      form={form}
      disabled={disabled}
      style={style}
      className={`${styles.submitButton} ${disabled ? styles.disabled : ""} ${className || ""}`}
      {...rest}
    >
      {isSubmitting ? "در حال ارسال..." : children || "ارسال"}
    </button>
  );
}