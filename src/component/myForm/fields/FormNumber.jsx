"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import styles from "./Field.module.css";

export default function FormNumber({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  min,
  minMessage,
  max,
  maxMessage,
  step,
  validate,
  disabled,
  readOnly,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormNumber must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `مقدار باید حداقل ${min} باشد`
    };
  }
  
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `مقدار باید حداکثر ${max} باشد`
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
                readOnly={readOnly}
                min={min}
                max={max}
                step={step}
                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                className={`${styles.inputInline} ${fieldState.error ? styles.error : ""} ${className || ""}`}
                {...rest}
              />
            </div>
          ) : (
            <input
              {...field}
              type="number"
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              min={min}
              max={max}
              step={step}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
              className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`}
              {...rest}
            />
          )}
          {fieldState.error && (
            <span className={styles.errorMessage}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
