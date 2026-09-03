"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./CurrencyInput.module.css";

const stripNonDigits = (value) =>
  String(value || "")
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    .replace(/[^0-9]/g, "");

const addSeparators = (numStr) => {
  if (!numStr) return "";
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function CurrencyInput({
  value,
  onChange,
  label,
  labelShort,
  placeholder,
  disabled,
  inlineLabel,
  required,
  ...rest
}) {
  const raw = stripNonDigits(value);

  const [display, setDisplay] = useState(() => addSeparators(raw));

  useEffect(() => {
    setDisplay(addSeparators(stripNonDigits(value)));
  }, [value]);

  const handleChange = useCallback(
    (e) => {
      const cursor = e.target.selectionStart;
      const oldDisplay = display;

      const cleaned = stripNonDigits(e.target.value);
      const newDisplay = addSeparators(cleaned);

      setDisplay(newDisplay);

      onChange?.(cleaned ? Number(cleaned) : "");

      requestAnimationFrame(() => {
        const el = e.target;

        if (!el) return;

        const diff = newDisplay.length - oldDisplay.length;
        const newPos = cursor + diff;

        el.setSelectionRange(newPos, newPos);
      });
    },
    [display, onChange],
  );

  return (
    <div className={styles.container}>
      {label && !inlineLabel && <label className={styles.label}>{label}</label>}
      {inlineLabel ? (
        <div className={`${styles.inlineWrap} ${disabled ? styles.disabled : ""}`}>
          <span className={styles.inlineLabel}>
            {inlineLabel}
            {required && <span className={styles.inlineRequiredMark}>*</span>}
          </span>
          <input
            type="text"
            className={styles.inputInline}
            value={display}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            inputMode="numeric"
            dir="ltr"
            {...rest}
          />
        </div>
      ) : (
        <input
          type="text"
          className={styles.input}
          value={display}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          inputMode="numeric"
          dir="ltr"
          {...rest}
        />
      )}
    </div>
  );
}