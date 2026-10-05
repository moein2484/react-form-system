"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useImperativeHandle, useEffect, useRef, useState } from "react";
import styles from "./FileUpload.module.css";
import FileTypeIcon from "./FileTypeIcon";
const toReadableSize = bytes => {
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
  doneText, errorText
}) {
  const isUploading = status === "uploading";
  const isDone = status === "done";
  const failed = status === "error";
  return <Styled as="li" css={styles} className={`${styles.fileItem} ${isUploading ? styles.uploading : ""} ${isDone ? styles.uploaded : ""}`}>
      {isUploading ? <Styled as="span" css={styles} className={`${styles.typeIcon} ${styles.uploadingIcon}`}>
          <Styled as="span" css={styles} className={styles.spinner} />
        </Styled> : <FileTypeIcon file={file} />}
      <Styled as="div" css={styles} className={styles.fileInfo}>
        <Styled as="span" css={styles} className={styles.fileNameRow}>
          <Styled as="span" css={styles} className={styles.fileName}>{file.name}</Styled>
          {isDone && <Styled as="span" css={styles} className={styles.successCheck}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Styled>}
        </Styled>
        <Styled as="span" css={styles} className={styles.fileMeta}>
          {failed ? <Styled as="span" css={styles} role="alert" className={styles.uploadError}>{errorText || "بارگذاری ناموفق بود"}</Styled> : isUploading ? <Styled as="span" css={styles} className={styles.statusText}>
              {uploadText || "در حال بارگذاری..."}
            </Styled> : <>
              {toReadableSize(file.size)}
              {isDone && <Styled as="span" css={styles} className={`${styles.statusText} ${styles.done}`}>
                  {doneText || "بارگذاری شد"}
                </Styled>}
            </>}
        </Styled>
      </Styled>
      {onRemove && !disabled && <Styled as="button" css={styles} type="button" className={styles.removeBtn} onClick={e => {
      e.stopPropagation();
      onRemove(index, file);
    }} disabled={disabled || isUploading} aria-label={`حذف ${file.name}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Styled>}
    </Styled>;
}
function AvatarPreview({
  file,
  status
}) {
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
  return <Styled as="div" css={styles} className={styles.avatarContainer}>
      {src ? <Styled as="img" css={styles} src={src} className={styles.avatarPreview} alt={file.name} /> : <Styled as="span" css={styles} className={styles.icon}>
          <svg width="54" height="54" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Styled>}

      {uploading && <Styled as="span" css={styles} className={styles.avatarOverlay}>
          <Styled as="span" css={styles} className={styles.avatarSpinner} />
        </Styled>}
    </Styled>;
}
function AvatarDropzone({
  file,
  status,
  disabled,
  onChange,
  size = "md", className, style, onBlur, inputRef: externalRef, name, accept, error, errorText, ...rest
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  useImperativeHandle(externalRef, () => inputRef.current);
  const handleFiles = filesList => {
    const list = Array.from(filesList || []);
    if (list.length === 0) return;
    onChange(list);
  };
  return <Styled as="div" css={styles} className={`${styles.dropzone} ${styles.avatar} ${styles[size] || ""} ${dragging ? styles.dragging : ""} ${disabled ? styles.disabled : ""} ${error ? styles.error : ""} ${className || ""}`} {...rest} style={style} onBlur={onBlur} role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} onKeyDown={event => { if (!disabled && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); inputRef.current?.click(); } }} onClick={() => !disabled && inputRef.current && inputRef.current.click()} onDragOver={e => {
    e.preventDefault();
    if (!disabled) setDragging(true);
  }} onDragLeave={() => setDragging(false)} onDrop={e => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  }}>
      {status === "error" && <Styled as="span" css={styles} role="alert" className={styles.uploadError}>{errorText}</Styled>}
      {file ? <AvatarPreview key={`${file.name}-${file.size}-${file.lastModified}-${file.type}`} file={file} status={status} /> : <Styled as="span" css={styles} className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
            <path d="M4 20c0-3.3 3.6-5 8-5s8 1.7 8 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Styled>}
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
      <input ref={inputRef} name={name} type="file" accept={accept || "image/*"} disabled={disabled} onChange={e => {
      handleFiles(e.target.files);
      e.target.value = "";
    }} style={{
      display: "none"
    }} />
    </Styled>;
}
function FileDropzone({
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
  doneText, errorText, className, style, onBlur, inputRef: externalRef, name, ...rest
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  useImperativeHandle(externalRef, () => inputRef.current);
  const handleFiles = files => {
    const list = Array.from(files || []);
    if (list.length === 0) return;
    onChange(list);
  };
  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };
  const handleChange = e => {
    handleFiles(e.target.files);
    e.target.value = "";
  };
  const files = value ? Array.isArray(value) ? value : [value] : [];
  if (variant === "avatar") {
    const file = files[0] || null;
    return <AvatarDropzone file={file} status={file && getStatus ? getStatus(file, 0) : undefined} disabled={disabled} onChange={handleFiles} size={size} className={className} style={style} onBlur={onBlur} inputRef={externalRef} name={name} accept={accept} error={error} errorText={errorText} {...rest} />;
  }
  const containerClass = [styles.dropzone, styles[size] || "", dragging ? styles.dragging : "", disabled ? styles.disabled : "", error ? styles.error : "", className || ""].join(" ");
  return <div>
      <Styled as="div" css={styles} className={containerClass} {...rest} style={style} onBlur={onBlur} role="button" tabIndex={disabled ? -1 : 0} aria-disabled={disabled} onKeyDown={event => { if (!disabled && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); inputRef.current?.click(); } }} onClick={() => !disabled && inputRef.current && inputRef.current.click()} onDragOver={e => {
      e.preventDefault();
      if (!disabled) setDragging(true);
    }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
        <Styled as="span" css={styles} className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Styled>
        <Styled as="div" css={styles} className={styles.dragText}>
          {dragText || (multiple ? "فایل‌ها را اینجا بکشید و رها کنید" : "فایل را اینجا بکشید و رها کنید")}
        </Styled>
        <Styled as="div" css={styles} className={styles.dragHint}>
          {dragHint || <>
              برای انتخاب، روی این‌باکس کلیک کنید یا{" "}
              <Styled as="span" css={styles} className={styles.browseText}>{browseText || "مرور"}</Styled>{" "}
              را بزنید
            </>}
        </Styled>
        <input ref={inputRef} name={name} type="file" multiple={multiple} accept={accept} disabled={disabled} onChange={handleChange} style={{
        display: "none"
      }} />
      </Styled>

      {files.length > 0 && <Styled as="ul" css={styles} className={styles.fileList}>
          {files.map((file, index) => renderItem ? renderItem(file, index) : <DefaultFileItem key={`${file.name}-${index}`} file={file} index={index} status={getStatus ? getStatus(file, index) : undefined} onRemove={onRemove} disabled={disabled} uploadText={uploadText} doneText={doneText} errorText={errorText} />)}
        </Styled>}
    </div>;
}
export default withAppearance(FileDropzone);
