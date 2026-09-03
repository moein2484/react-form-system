"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormPercentage({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  min = 0,
  minMessage,
  max = 100,
  maxMessage,
  step = 0.01,
  validate,
  disabled,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormPercentage must be used within a Form");
  }

  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `درصد باید حداقل ${min} باشد`
    };
  }
  
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `درصد باید حداکثر ${max} باشد`
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
                type="number"
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                className={`${styles.inputInline} ${fieldState.error ? styles.error : ""} ${className || ""}`}
                {...rest}
              />
              <span className={styles.inlineSymbol}>%</span>
            </div>
          ) : (
            <div className={styles.percentageContainer}>
              <input
                {...field}
                type="number"
                placeholder={placeholder}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`}
                {...rest}
              />
              <span className={styles.percentageSymbol}>%</span>
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
