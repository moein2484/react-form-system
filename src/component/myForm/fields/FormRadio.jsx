"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormRadio({
  name,
  label,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  validate,
  disabled,
  options = [],
  valueKey = "value",
  labelKey = "label",
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormRadio must be used within a Form");
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
          {label && (
            <label className={styles.label}>
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          <div className={styles.radioContainer}>
            {options.map((option) => (
              <div key={option[valueKey]} className={styles.radioOption}>
                <input
                  {...field}
                  type="radio"
                  id={`${name}-${option[valueKey]}`}
                  value={option[valueKey]}
                  disabled={disabled}
                  className={styles.radioInput}
                  checked={field.value === option[valueKey]}
                  onChange={(e) => field.onChange(e.target.value)}
                  {...rest}
                />
                <label htmlFor={`${name}-${option[valueKey]}`}>
                  {option[labelKey]}
                </label>
              </div>
            ))}
          </div>
          {fieldState.error && (
            <span className={styles.errorMessage}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
