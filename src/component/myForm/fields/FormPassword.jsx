"use client";

import { useState } from "react";
import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormPassword({
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
  showToggle = true,
  className,
  ...rest
}) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  if (!control) {
    throw new Error("FormPassword must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  if (minLength) {
    rules.minLength = {
      value: minLength,
      message: minLengthMessage || `رمز عبور حداقل باید ${minLength} کاراکتر باشد`
    };
  }
  
  if (maxLength) {
    rules.maxLength = {
      value: maxLength,
      message: maxLengthMessage || `رمز عبور حداکثر باید ${maxLength} کاراکتر باشد`
    };
  }
  
  if (validate) {
    rules.validate = validate;
  }

  const title = labelShort || label;
  const inline = Boolean(labelShort);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.fieldContainer} data-form-field={name}>
          {title && !inline && (
            <label className={styles.label}>
              {title}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          {inline ? (
            <div className={`${styles.inlineWrap} ${disabled ? styles.disabled : ""}`}>
              {title && (
                <span className={styles.inlineLabel}>
                  {title}
                  {required && <span className={styles.inlineRequiredMark}>*</span>}
                </span>
              )}
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={`${styles.inputInline} ${showToggle ? styles.inputInlineWithToggle : ""} ${fieldState.error ? styles.error : ""} ${className || ""}`}
                {...rest}
              />
              {showToggle && (
                <button
                  type="button"
                  className={styles.passwordInlineToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled || readOnly}
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              )}
            </div>
          ) : (
            <div className={styles.passwordContainer}>
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`}
                {...rest}
              />
              {showToggle && (
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={disabled || readOnly}
                >
                  {showPassword ? "👁️" : "🔒"}
                </button>
              )}
            </div>
          )}
          {fieldState.error && (
            <span className={styles.errorMessage}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
