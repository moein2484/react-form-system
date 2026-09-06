"use client";
import { forwardRef } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "./ShamsiDatePicker.module.css";

const ShamsiDatePicker = forwardRef(
  (
    {
      value,
      onChange,
      label,
      labelShort,
      placeholder = "انتخاب تاریخ",
      error,
      fullWidth = true,
      size = "small",
      inlineLabel,
      required,
      ...rest
    },
    ref,
  ) => {
    const handleChange = (date) => {
      if (!date || !date.isValid) {
        onChange?.("");
        return;
      }
      // تاریخ شمسی را به میلادی تبدیل کن و به صورت YYYY-MM-DD ذخیره کن
      const native = date.toDate();
      const gregorianDate = new DateObject({
        date: native,
        calendar: gregorian,
      });
      onChange?.(gregorianDate.format("YYYY-MM-DD"));
    };

    const dateValue = value
      ? new DateObject({ date: value, calendar: gregorian, format: "YYYY-MM-DD" })
      : null;

    const labelText = inlineLabel || labelShort || label;
    const paddingRight = labelText && !(inlineLabel || labelShort) && label ? "0 12px" : (inlineLabel || labelShort) ? "0 12px 0 12px" : "0 12px";

    return (
      <div className={fullWidth ? styles.fullWidth : ""}>
        {labelText && !inlineLabel && !labelShort && (
          <label className={styles.label}>{labelText}</label>
        )}
        <div className={inlineLabel || labelShort ? styles.inlineWrap : undefined}>
          {(inlineLabel || labelShort) && (
            <span className={styles.inlineLabel}>
              {labelText}
              {required && <span className={styles.inlineRequiredMark}>*</span>}
            </span>
          )}
          <div className={`${styles.dateInputWrap} ${inlineLabel || labelShort ? styles.dateInputInline : styles.dateInputNorm}`}>
            <DatePicker
              ref={ref}
              calendar={persian}
              locale={persian_fa}
              value={dateValue}
              onChange={handleChange}
              placeholder={placeholder}
              calendarPosition="bottom-right"
              format="YYYY/MM/DD"
              containerClassName="shamsi-datepicker-container"
              inputClass={`shamsi-datepicker-input${error ? " shamsi-datepicker-error" : ""}`}
              style={{
                width: "100%",
                height: size === "small" ? 42 : 48,
                borderRadius: "var(--form-radius, 10px)",
                border: (inlineLabel || labelShort)
                  ? "none"
                  : "1px solid var(--form-border, #e0e0e0)",
                padding: "0 12px",
                fontSize: "0.85rem",
                fontFamily: "var(--font-fa)",
                outline: "none",
                boxSizing: "border-box",
                background: "#fff",
                color: "#222",
              }}
              {...rest}
            />
          </div>
        </div>
      </div>
    );
  },
);

ShamsiDatePicker.displayName = "ShamsiDatePicker";
export default ShamsiDatePicker;
