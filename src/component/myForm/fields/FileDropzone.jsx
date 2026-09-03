"use client";

import { useRef, useState } from "react";
import styles from "./FileUpload.module.css";
import FileTypeIcon from "./FileTypeIcon";

const toReadableSize = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} بایت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
};

function DefaultFileItem({ file, index, status, onRemove, disabled, uploadText, doneText }) {
  const isUploading = status === "uploading";
  const isDone = status === "done";

  return (
    <li className={`${styles.fileItem} ${isUploading ? styles.uploading : ""} ${isDone ? styles.uploaded : ""}`}>
      {isUploading ? (
        <span className={`${styles.typeIcon} ${styles.uploadingIcon}`}>
          <span className={styles.spinner} />
        </span>
      ) : (
        <FileTypeIcon file={file} />
      )}
      <div className={styles.fileInfo}>
        <span className={styles.fileNameRow}>
          <span className={styles.fileName}>{file.name}</span>
          {isDone && (
            <span className={styles.successCheck}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l4 4L19 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
        </span>
        <span className={styles.fileMeta}>
          {isUploading ? (
            <span className={styles.statusText}>
              {uploadText || "در حال بارگذاری..."}
            </span>
          ) : (
            <>
              {toReadableSize(file.size)}
              {isDone && (
                <span className={`${styles.statusText} ${styles.done}`}>
                  {doneText || "بارگذاری شد"}
                </span>
              )}
            </>
          )}
        </span>
      </div>
      {onRemove && !disabled && (
        <button
          type="button"
          className={styles.removeBtn}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index, file);
          }}
          disabled={disabled || isUploading}
          aria-label={`حذف ${file.name}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </li>
  );
}

export default function FileDropzone({
  value,
  onChange,
  multiple = false,
  accept,
  disabled = false,
  error = false,
  dragText,
  dragHint,
  browseText,
  renderItem,
  onRemove,
  getStatus,
  uploadText,
  doneText,
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const list = Array.from(files || []);
    if (list.length === 0) return;
    onChange(list);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const files = value
    ? Array.isArray(value)
      ? value
      : [value]
    : [];

  const containerClass = [
    styles.dropzone,
    dragging ? styles.dragging : "",
    disabled ? styles.disabled : "",
    error ? styles.error : "",
  ].join(" ");

  return (
    <div>
      <div
        className={containerClass}
        onClick={() => !disabled && inputRef.current && inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <span className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div className={styles.dragText}>
          {dragText || (multiple ? "فایل‌ها را اینجا بکشید و رها کنید" : "فایل را اینجا بکشید و رها کنید")}
        </div>
        <div className={styles.dragHint}>
          {dragHint || (
            <>
              برای انتخاب، روی این‌باکس کلیک کنید یا{" "}
              <span className={styles.browseText}>{browseText || "مرور"}</span> را بزنید
            </>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>

      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, index) =>
            renderItem ? (
              renderItem(file, index)
            ) : (
              <DefaultFileItem
                key={`${file.name}-${index}`}
                file={file}
                index={index}
                status={getStatus ? getStatus(file, index) : undefined}
                onRemove={onRemove}
                disabled={disabled}
                uploadText={uploadText}
                doneText={doneText}
              />
            ),
          )}
        </ul>
      )}
    </div>
  );
}