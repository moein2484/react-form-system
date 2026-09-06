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
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  asString = false,
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

  if (asString) {
    // حالت رشته‌ای — مقدار به‌صورت string ذخیره می‌شود تا با schemaهای
    // z.string() (مثل کد ملی، کد پستی و...) سازگار باشد
    if (min !== undefined || max !== undefined) {
      rules.validate = {
        range: (v) => {
          const parsed = v === "" || v == null ? NaN : Number(v);
          if (min !== undefined && (Number.isNaN(parsed) || parsed < min))
            return minMessage || `مقدار باید حداقل ${min} باشد`;
          if (max !== undefined && (Number.isNaN(parsed) || parsed > max))
            return maxMessage || `مقدار باید حداکثر ${max} باشد`;
          return true;
        },
        ...(validate ? { custom: validate } : {}),
      };
    } else if (validate) {
      rules.validate = validate;
    }

    if (minLength) {
      rules.minLength = {
        value: minLength,
        message: minLengthMessage || `حداقل ${minLength} کاراکتر`,
      };
    }
    if (maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: maxLengthMessage || `حداکثر ${maxLength} کاراکتر`,
      };
    }
  } else {
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
  }

  const title = labelShort || label;
  const inline = Boolean(labelShort);

  const handleChange = (field, e) =>
    field.onChange(asString ? e.target.value : e.target.valueAsNumber);

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
                onChange={(e) => handleChange(field, e)}
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
              onChange={(e) => handleChange(field, e)}
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
