"use client";

import { Styled, withAppearance, useAppearance } from "./core/Appearance";
import { forwardRef } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import persian_fa from "react-date-object/locales/persian_fa";
import styles from "./ShamsiDatePicker.module.css";

const ShamsiDatePicker = forwardRef(function ShamsiDatePicker({
  value, onChange, onBlur, inputRef, label, labelShort, placeholder = "انتخاب تاریخ", error,
  fullWidth = true, size = "small", inlineLabel, required, disabled, readOnly, name,
  className, style, inputClass, calendarClassName, datePickerProps = {}, ...rest
}, ref) {
  const appearance = useAppearance();
  const handleChange = (date) => {
    if (!date?.isValid) onChange?.("");
    else onChange?.(new DateObject({ date: date.toDate(), calendar: gregorian }).format("YYYY-MM-DD"));
    queueMicrotask(() => onBlur?.());
  };
  const dateValue = value ? new DateObject({ date: value, calendar: gregorian, format: "YYYY-MM-DD" }) : null;
  const title = inlineLabel || labelShort;
  return <Styled css={styles} className={fullWidth ? styles.fullWidth : ""}>
    {label && !title && <Styled as="label" css={styles} className={styles.label}>{label}</Styled>}
    <Styled css={styles} className={title ? styles.inlineWrap : ""}>
      {title && <Styled as="span" css={styles} className={styles.inlineLabel}>{title}
        {required && <Styled as="span" css={styles} className={styles.inlineRequiredMark}>*</Styled>}
      </Styled>}
      <Styled css={styles} className={`${styles.dateInputWrap} ${title ? styles.dateInputInline : styles.dateInputNorm}`}>
        <DatePicker {...rest} {...datePickerProps} ref={ref} calendar={persian} locale={persian_fa}
          value={dateValue} onChange={handleChange} disabled={disabled} readOnly={readOnly}
          calendarPosition="bottom-right" format="YYYY/MM/DD" portal zIndex={20000}
          className={`${appearance.unstyled ? "" : "shamsi-datepicker-calendar"} ${calendarClassName || ""} ${appearance.classNames.calendar || ""}`}
          containerClassName={`shamsi-datepicker-container ${appearance.classNames.datePickerContainer || ""}`}
          containerStyle={appearance.styles.datePickerContainer}
          onClose={() => { onBlur?.(); return datePickerProps.onClose?.(); }}
          render={(text, openCalendar, handleValueChange) => <Styled as="input" css={styles}
            ref={inputRef} name={name} value={text} onChange={handleValueChange} onBlur={onBlur}
            onFocus={() => { if (!disabled && !readOnly) openCalendar(); }}
            placeholder={placeholder} disabled={disabled} readOnly={readOnly}
            aria-required={required} aria-invalid={Boolean(error)}
            className={`${styles.input} ${title ? styles.inputInline : ""} ${error ? styles.error : ""} ${className || ""} ${inputClass || ""}`}
            style={{ ...(size !== "small" ? { height: 48 } : {}), ...style }} />}
        />
      </Styled>
    </Styled>
  </Styled>;
});
export default withAppearance(ShamsiDatePicker);
