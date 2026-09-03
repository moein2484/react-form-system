"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormInput({
  name,
  label,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  pattern,
  patternMessage = "فرمت وارد شده معتبر نیست",
  validate,
  disabled,
  readOnly,
  type = "text",
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormInput must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  if (minLength) {
    rules.minLength = {
      value: minLength,
      message: minLengthMessage || `حداقل باید ${minLength} کاراکتر باشد`
    };
  }
  
  if (maxLength) {
    rules.maxLength = {
      value: maxLength,
      message: maxLengthMessage || `حداکثر باید ${maxLength} کاراکتر باشد`
    };
  }
  
  if (pattern) {
    rules.pattern = {
      value: new RegExp(pattern),
      message: patternMessage
    };
  }
  
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
            type={type}
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
