"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormSwitch({
  name,
  label,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  validate,
  disabled,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormSwitch must be used within a Form");
  }

  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
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
          <div className={styles.switchContainer}>
            <input
              {...field}
              type="checkbox"
              id={name}
              disabled={disabled}
              className={`${styles.switchInput} ${className || ""}`}
              checked={field.value || false}
              onChange={(e) => field.onChange(e.target.checked)}
              {...rest}
            />
            {label && (
              <label htmlFor={name} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
              </label>
            )}
          </div>
          {fieldState.error && (
            <span className={styles.errorMessage}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
