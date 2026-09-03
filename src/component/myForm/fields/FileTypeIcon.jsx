"use client";

import { useEffect, useState } from "react";
import styles from "./FileUpload.module.css";

const getFileKind = (file) => {
  const type = (file.type || "").toLowerCase();
  const name = (file.name || "").toLowerCase();
  if (type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(name)) return "image";
  if (type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    type === "application/msword" ||
    type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "word";
  if (
    name.endsWith(".xls") ||
    name.endsWith(".xlsx") ||
    type === "application/vnd.ms-excel" ||
    type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  )
    return "excel";
  if (/\.(zip|rar|7z|tar|gz)$/.test(name)) return "zip";
  if (type.startsWith("text/") || /\.(txt|csv|md|json|xml|log)$/.test(name)) return "text";
  return "default";
};

const BADGES = {
  pdf: "PDF",
  word: "WORD",
  excel: "EXCEL",
  image: "IMG",
  zip: "ZIP",
  text: "TXT",
  default: "FILE",
};

export function getFileKindKey(file) {
  return getFileKind(file);
}

export default function FileTypeIcon({ file }) {
  const [src, setSrc] = useState(null);
  const kind = getFileKind(file);
  const isImg = kind === "image";

  useEffect(() => {
    if (!isImg || !file) return;
    let cancelled = false;
    const reader = new FileReader();
    reader.onload = () => {
      if (!cancelled) setSrc(reader.result);
    };
    reader.readAsDataURL(file);
    return () => {
      cancelled = true;
    };
  }, [file, isImg]);

  if (isImg && src) {
    return (
      <div className={styles.previewWrap}>
        <img src={src} className={styles.previewImg} alt={file.name} />
        <span className={`${styles.typeBadge} ${styles.imgBadge}`}>{BADGES.image}</span>
      </div>
    );
  }

  return (
    <span className={`${styles.typeIcon} ${styles[kind] || styles.default}`}>
      {kind === "pdf" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      {kind === "word" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 15l1.5-6 1.5 4 1.5-4 1.5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {kind === "excel" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )}
      {kind === "zip" && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7v3m0 0l3 1.5M12 10l-3 1.5M12 10v4m0 0l3 2m-3-2l-3 2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      )}
      {(kind === "text" || kind === "default") && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 14.5l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className={styles.typeBadge}>{BADGES[kind]}</span>
    </span>
  );
}