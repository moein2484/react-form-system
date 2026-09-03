"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormTextarea({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  validate,
  disabled,
  readOnly,
  rows = 4,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormTextarea must be used within a Form");
  }

  const rules = {};

  if (required) {
    rules.required = requiredMessage;
  }

  if (minLength) {
    rules.minLength = {
      value: minLength,
      message: minLengthMessage || `حداقل باید ${minLength} کاراکتر باشد`,
    };
  }

  if (maxLength) {
    rules.maxLength = {
      value: maxLength,
      message: maxLengthMessage || `حداکثر باید ${maxLength} کاراکتر باشد`,
    };
  }

  if (validate) {
    rules.validate = validate;
  }

  const title = labelShort || label;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.fieldContainer} data-form-field={name}>
          {title && (
            <label className={styles.label}>
              {title}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          <textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`${styles.textarea} ${fieldState.error ? styles.error : ""} ${className || ""}`}
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