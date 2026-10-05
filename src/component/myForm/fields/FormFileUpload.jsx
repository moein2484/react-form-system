"use client";

import { useState, useRef } from "react";
import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import FileDropzone from "./FileDropzone";
import styles from "./Field.module.css";

const readableSize = (bytes) => bytes < 1024 ? `${bytes} بایت` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} کیلوبایت` : `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
const matchesAccept = (file, accept) => !accept || accept.split(",").some((item) => {
  const type = item.trim().toLowerCase();
  if (type.startsWith(".")) return file.name.toLowerCase().endsWith(type);
  if (type.endsWith("/*")) return file.type.toLowerCase().startsWith(type.slice(0, -1));
  return file.type.toLowerCase() === type;
});

function FormFileUpload({
  name, label, required = false, requiredMessage = "این فیلد الزامی است",
  accept, acceptMessage = "نوع فایل مجاز نیست", maxSize, maxSizeMessage, minSize, minSizeMessage,
  validate, disabled, multiple = false, onUpload, uploadText = "در حال بارگذاری...",
  uploadDoneText = "بارگذاری شد", uploadErrorText = "بارگذاری ناموفق بود",
  size = "md", variant = "upload", dragText, dragHint, browseText, renderItem,
  className, style, ...rest
}) {
  const { control } = useFormContext();
  const [statuses, setStatuses] = useState(new Map());
  const requests = useRef(new WeakMap());
  const listOf = (value) => multiple ? (Array.isArray(value) ? value : []) : value ? [value] : [];
  const fileError = (file) => {
    if (!matchesAccept(file, accept)) return acceptMessage;
    if (maxSize != null && file.size > maxSize) return maxSizeMessage || `${file.name}: حداکثر حجم ${readableSize(maxSize)}`;
    if (minSize != null && file.size < minSize) return minSizeMessage || `${file.name}: حداقل حجم ${readableSize(minSize)}`;
    return null;
  };
  const rules = { validate: {
    files: (value) => listOf(value).map(fileError).find(Boolean) || true,
    ...(typeof validate === "function" ? { custom: validate } : validate),
  } };
  const runUpload = async (file) => {
    if (!onUpload || fileError(file)) return;
    const request = {};
    requests.current.set(file, request);
    const setStatus = (status) => {
      if (requests.current.get(file) === request) setStatuses((previous) => new Map(previous).set(file, status));
    };
    setStatus("uploading");
    try { await onUpload(file); setStatus("done"); }
    catch { setStatus("error"); }
  };

  return <Controller name={name} control={control} defaultValue={multiple ? [] : null}
    required={required} requiredMessage={requiredMessage} rules={rules}
    render={({ field, fieldState }) => {
      const value = multiple ? listOf(field.value) : field.value || null;
      const handleFiles = (files) => {
        const selected = multiple ? files : files.slice(0, 1);
        field.onChange(multiple ? [...listOf(field.value), ...selected] : selected[0] || null);
        queueMicrotask(field.onBlur);
        selected.forEach(runUpload);
      };
      const handleRemove = (index) => {
        const files = listOf(field.value);
        const file = files[index];
        if (file) {
          requests.current.delete(file);
          setStatuses((previous) => { const next = new Map(previous); next.delete(file); return next; });
        }
        field.onChange(multiple ? files.filter((_, i) => i !== index) : null);
        queueMicrotask(field.onBlur);
      };
      return <Styled css={styles} className={styles.fieldContainer} data-form-field={name}>
        {label && <Styled as="label" css={styles} className={styles.label}>{label}
          {required && <Styled as="span" css={styles} className={styles.required}>*</Styled>}
        </Styled>}
        <FileDropzone {...rest} className={className} style={style} name={name} inputRef={field.ref}
          onBlur={field.onBlur} value={value} onChange={handleFiles} multiple={multiple} accept={accept}
          disabled={disabled} error={!!fieldState.error} size={size} variant={variant}
          dragText={dragText} dragHint={dragHint} browseText={browseText} onRemove={handleRemove}
          renderItem={renderItem} getStatus={(file) => statuses.get(file)} uploadText={uploadText}
          doneText={uploadDoneText} errorText={uploadErrorText} />
        {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
      </Styled>;
    }} />;
}
export default withAppearance(FormFileUpload);
