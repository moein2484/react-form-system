"use client";

import { Styled, withAppearance } from "./core/Appearance";
import styles from "./CurrencyInput.module.css";

const digits = (value) => String(value ?? "").replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[^0-9]/g, "");
const format = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function CurrencyInput({ value, onChange, label, labelShort, placeholder, disabled,
  inlineLabel, required, error, asString = false, inputRef, className, style, ...rest }) {
  const title = inlineLabel || labelShort;
  const handleChange = (event) => {
    const input = event.target;
    const count = digits(input.value.slice(0, input.selectionStart)).length;
    const cleaned = digits(input.value);
    onChange?.(cleaned ? asString ? cleaned : Number(cleaned) : "");
    requestAnimationFrame(() => {
      if (!input.isConnected) return;
      let position = 0, seen = 0;
      while (position < input.value.length && seen < count) {
        if (/\d/.test(input.value[position])) seen++;
        position++;
      }
      input.setSelectionRange(position, position);
    });
  };
  const input = <Styled as="input" css={styles} {...rest} ref={inputRef} type="text"
    className={`${title ? styles.inputInline : styles.input} ${error ? styles.error : ""} ${className || ""}`} style={style}
    value={format(digits(value))} onChange={handleChange} placeholder={placeholder}
    disabled={disabled} aria-required={required} aria-invalid={Boolean(error)} inputMode="numeric" dir="ltr" />;
  return <Styled css={styles} className={styles.container}>
    {label && !title && <Styled as="label" css={styles} className={styles.label}>{label}</Styled>}
    {title ? <Styled css={styles} className={`${styles.inlineWrap} ${disabled ? styles.disabled : ""} ${error ? styles.error : ""}`}>
      <Styled as="span" css={styles} className={styles.inlineLabel}>{title}
        {required && <Styled as="span" css={styles} className={styles.inlineRequiredMark}>*</Styled>}
      </Styled>{input}
    </Styled> : input}
  </Styled>;
}
export default withAppearance(CurrencyInput);
