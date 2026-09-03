"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormEmail({
  name,
  label,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  emailMessage = "ایمیل معتبر نیست",
  validate,
  disabled,
  readOnly,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormEmail must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  // Validation برای ایمیل
  rules.pattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: emailMessage,
  };
  
  if (validate) {
    rules.validate = validate;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.fieldContainer} data-form-field={name}>
          {label && (
            <label className={styles.label}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          <input
            {...field}
            type="email"
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`}
            {...rest}
          />
          {fieldState.error && (
            <span className={styles.errorMessage}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
