"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FileUpload.module.css";
import FileTypeIcon from "./FileTypeIcon";

const toReadableSize = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} بایت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
};

function DefaultFileItem({
  file,
  index,
  status,
  onRemove,
  disabled,
  uploadText,
  doneText,
}) {
  const isUploading = status === "uploading";
  const isDone = status === "done";

  return (
    <li
      className={`${styles.fileItem} ${isUploading ? styles.uploading : ""} ${isDone ? styles.uploaded : ""}`}
    >
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

function AvatarPreview({ file, status }) {
  const [src, setSrc] = useState(null);
  const isImage = (file.type || "").startsWith("image/");
  const uploading = status === "uploading";

  useEffect(() => {
    if (!isImage) return;
    let cancelled = false;

    const reader = new FileReader();
    reader.onload = () => {
      if (!cancelled) setSrc(reader.result);
    };
    reader.readAsDataURL(file);
    return () => {
      cancelled = true;
    };
  }, [file, isImage]);

  return (
    <div className={styles.avatarContainer}>
      {src ? (
        <img src={src} className={styles.avatarPreview} alt={file.name} />
      ) : (
        <span className={styles.icon}>
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}

      {uploading && (
        <span className={styles.avatarOverlay}>
          <span className={styles.avatarSpinner} />
        </span>
      )}
    </div>
  );
}

function AvatarDropzone({ file, status, disabled, onChange, size = "md" }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (filesList) => {
    const list = Array.from(filesList || []);
    if (list.length === 0) return;
    onChange(list);
  };

  return (
    <div
      className={`${styles.dropzone} ${styles.avatar} ${styles[size] || ""} ${dragging ? styles.dragging : ""} ${disabled ? styles.disabled : ""}`}
      onClick={() => !disabled && inputRef.current && inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (disabled) return;
        handleFiles(e.dataTransfer.files);
      }}
    >
      {file ? (
        <AvatarPreview
          key={`${file.name}-${file.size}-${file.lastModified}-${file.type}`}
          file={file}
          status={status}
        />
      ) : (
        <span className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="8"
              r="4"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
      {/* <span className={styles.avatarBadge}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span> */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={disabled}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default function FileDropzone({
  value,
  onChange,
  multiple = false,
  accept,
  disabled = false,
  error = false,
  size = "md",
  variant = "upload",
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

  const files = value ? (Array.isArray(value) ? value : [value]) : [];

  if (variant === "avatar") {
    const file = files[0] || null;
    return (
      <AvatarDropzone
        file={file}
        status={file && getStatus ? getStatus(file, 0) : undefined}
        disabled={disabled}
        onChange={handleFiles}
        size={size}
      />
    );
  }

  const containerClass = [
    styles.dropzone,
    styles[size] || "",
    dragging ? styles.dragging : "",
    disabled ? styles.disabled : "",
    error ? styles.error : "",
  ].join(" ");

  return (
    <div>
      <div
        className={containerClass}
        onClick={() =>
          !disabled && inputRef.current && inputRef.current.click()
        }
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
          {dragText ||
            (multiple
              ? "فایل‌ها را اینجا بکشید و رها کنید"
              : "فایل را اینجا بکشید و رها کنید")}
        </div>
        <div className={styles.dragHint}>
          {dragHint || (
            <>
              برای انتخاب، روی این‌باکس کلیک کنید یا{" "}
              <span className={styles.browseText}>{browseText || "مرور"}</span>{" "}
              را بزنید
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
