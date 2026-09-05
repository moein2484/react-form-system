"use client";

import { useOptionalFormContext } from "../core/FormProvider";
import styles from "./Actions.module.css";

export default function FormSubmit({ children, className, style, form, ...rest }) {
  const context = useOptionalFormContext();

  // خارج از <Form> — اتصال از طریق attribute توسّط `form`
  if (!context) {
    if (!form) {
      throw new Error(
        "FormSubmit خارج از Form استفاده شده است؛ برای اتصال به فرم باید prop «form» (شناسه‌ی فرم) را بدهید.",
      );
    }
    return (
      <button
        type="submit"
        form={form}
        style={style}
        className={`${styles.submitButton} ${className || ""}`}
        {...rest}
      >
        {children || "ارسال"}
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