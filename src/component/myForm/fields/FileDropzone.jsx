"use client";

import { useRef, useState } from "react";
import styles from "./FileUpload.module.css";

const toReadableSize = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} بایت`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} کیلوبایت`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} مگابایت`;
};

const isImage = (file) => (file.type || "").startsWith("image/");

function FilePreview({ file }) {
  const [src, setSrc] = useState(null);
  return isImage(file) ? (
    <div className={styles.previewWrap}>
      <img
        ref={(img) => {
          if (img && src === null) {
            const reader = new FileReader();
            reader.onload = () => setSrc(reader.result);
            reader.readAsDataURL(file);
          }
        }}
        src={src || undefined}
        className={styles.previewImg}
        alt={file.name}
      />
    </div>
  ) : (
    <div className={styles.fileIcon}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" />
      </svg>
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
  dragText,
  dragHint,
  browseText,
  renderItem,
  onRemove,
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
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className={styles.fileItem}>
              {renderItem ? (
                renderItem(file, index)
              ) : (
                <>
                  <FilePreview file={file} />
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{file.name}</span>
                    {file.size !== undefined && (
                      <span className={styles.fileMeta}>{toReadableSize(file.size)}</span>
                    )}
                  </div>
                  {onRemove && (
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(index, file);
                      }}
                      disabled={disabled}
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
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}