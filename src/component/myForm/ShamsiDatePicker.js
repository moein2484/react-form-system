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
      placeholder = "انتخاب تاریخ",
      error,
      fullWidth = true,
      size = "small",
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

    return (
      <div className={fullWidth ? styles.fullWidth : ""}>
        {label && <label className={styles.label}>{label}</label>}
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
            height: size === "small" ? 40 : 48,
            borderRadius: "10px",
            border: `1px solid ${error ? "#d32f2f" : "#e0e0e0"}`,
            padding: "0 12px",
            fontSize: "0.85rem",
            fontFamily: "var(--font-fa)",
            outline: "none",
            boxSizing: "border-box",
          }}
          {...rest}
        />
      </div>
    );
  },
);

ShamsiDatePicker.displayName = "ShamsiDatePicker";
export default ShamsiDatePicker;
