"use client";

import { useFormContext } from "../core/FormProvider";
import styles from "./Actions.module.css";

export default function FormSubmit({ children, className, style, ...rest }) {
  const { type, formState } = useFormContext();

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
      disabled={disabled}
      style={style}
      className={`${styles.submitButton} ${disabled ? styles.disabled : ""} ${className || ""}`}
      {...rest}
    >
      {isSubmitting ? "در حال ارسال..." : children || "ارسال"}
    </button>
  );
}
