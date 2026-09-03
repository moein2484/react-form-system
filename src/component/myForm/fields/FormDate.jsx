"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import ShamsiDatePicker from "../ShamsiDatePicker";
import styles from "./Field.module.css";

export default function FormDate({
  name,
  label,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  min,
  minMessage,
  max,
  maxMessage,
  validate,
  disabled,
  error: propError,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormDate must be used within a Form");
  }

  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `تاریخ باید بعد از ${min} باشد`
    };
  }
  
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `تاریخ باید قبل از ${max} باشد`
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
          <ShamsiDatePicker
            value={field.value || ""}
            onChange={field.onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={fieldState.error?.message}
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
