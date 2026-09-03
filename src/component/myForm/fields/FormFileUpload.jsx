"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import FileDropzone from "./FileDropzone";
import styles from "./Field.module.css";

const toReadableSize = (bytes) => {
  if (bytes < 1024) return `${bytes} بایت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
};

const matchesAccept = (file, accept) => {
  if (!accept) return true;
  const accepted = accept.split(",").map((a) => a.trim().toLowerCase());
  const fileType = (file.type || "").toLowerCase();
  const extMatch = accepted.some((a) => {
    if (a.startsWith(".")) return file.name.toLowerCase().endsWith(a);
    if (a.endsWith("/*")) return fileType.startsWith(a.replace("/*", "/"));
    return fileType === a;
  });
  return extMatch;
};

export default function FormFileUpload({
  name,
  label,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  accept,
  acceptMessage = "نوع فایل مجاز نیست",
  maxSize,
  maxSizeMessage,
  minSize,
  minSizeMessage,
  validate,
  disabled,
  multiple = false,
  dragText,
  dragHint,
  browseText,
  renderItem,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormFileUpload must be used within a Form");
  }

  const toValidateList = (v) => (multiple ? (Array.isArray(v) ? v : []) : v ? [v] : []);

  const validateValue = (v) => {
    const list = toValidateList(v);

    if (required && list.length === 0) return requiredMessage;

    for (const file of list) {
      if (!matchesAccept(file, accept)) return acceptMessage || `${file.name}: ${acceptMessage}`;
      if (maxSize && file.size > maxSize)
        return maxSizeMessage || `${file.name}: حداکثر حجم ${toReadableSize(maxSize)}`;
      if (minSize && file.size < minSize)
        return minSizeMessage || `${file.name}: حداقل حجم ${toReadableSize(minSize)}`;
    }

    if (validate) {
      const result = validate(v);
      if (typeof result === "string") return result;
      if (result === false) return "اعتبارسنجی ناموفق بود";
    }
    return true;
  };

  const rules = { validate: validateValue };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const value = multiple
          ? Array.isArray(field.value)
            ? field.value
            : []
          : field.value || null;

        const handleFiles = (list) => {
          if (multiple) {
            field.onChange([...value, ...list]);
          } else {
            field.onChange(list[0] || null);
          }
        };

        const handleRemove = (index) => {
          if (multiple) {
            field.onChange(value.filter((_, i) => i !== index));
          } else {
            field.onChange(null);
          }
        };

        return (
          <div className={styles.fieldContainer} data-form-field={name}>
            {label && (
              <label className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
              </label>
            )}
            <FileDropzone
              value={value}
              onChange={handleFiles}
              multiple={multiple}
              accept={accept}
              disabled={disabled}
              error={!!fieldState.error}
              dragText={dragText}
              dragHint={dragHint}
              browseText={browseText}
              onRemove={handleRemove}
              renderItem={renderItem}
              {...rest}
            />
            {fieldState.error && (
              <span className={styles.errorMessage}>{fieldState.error.message}</span>
            )}
          </div>
        );
      }}
    />
  );
}