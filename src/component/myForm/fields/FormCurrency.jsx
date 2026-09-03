"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import CurrencyInput from "../CurrencyInput";
import styles from "./Field.module.css";

export default function FormCurrency({
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
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormCurrency must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
  }
  
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `مبلغ باید حداقل ${min} باشد`
    };
  }
  
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `مبلغ باید حداکثر ${max} باشد`
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
          <CurrencyInput
            value={field.value || ""}
            onChange={(value) => field.onChange(value)}
            placeholder={placeholder}
            disabled={disabled}
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
