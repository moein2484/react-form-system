"use client";

import { useState } from "react";
import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import TimePickerTrigger from "../TimePicker/TimePickerTrigger";
import styles from "./Field.module.css";

export default function FormTime({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  validate,
  disabled,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormTime must be used within a Form");
  }

  const rules = {};
  
  if (required) {
    rules.required = requiredMessage;
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
          <TimePickerTrigger
            value={field.value || "08:00"}
            onChange={field.onChange}
            disabled={disabled}
            inlineLabel={inline ? title : undefined}
            required={required}
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
