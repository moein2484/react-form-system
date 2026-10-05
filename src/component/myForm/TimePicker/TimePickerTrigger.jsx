"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useImperativeHandle, useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import TimePicker from "./TimePicker";
import styles from "./TimePickerTrigger.module.css";

const persianDigits = (str) => String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
function TimePickerTrigger({ value, onChange, onBlur, inputRef, type, disabled, inlineLabel,
  required, placeholder = "انتخاب ساعت", className, style, ...rest }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const trigger = useRef(null);
  useImperativeHandle(inputRef, () => trigger.current);
  const popup = useRef(null);
  const close = useCallback(() => { setOpen(false); onBlur?.(); }, [onBlur]);
  useEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect) return;
      const width = popup.current?.offsetWidth || 240;
      const height = popup.current?.offsetHeight || 340;
      setPosition({
        left: Math.max(8, Math.min(rect.left, window.innerWidth - width - 8)),
        top: Math.max(8, rect.bottom + height + 4 > window.innerHeight ? rect.top - height - 4 : rect.bottom + 4),
      });
    };
    const frame = requestAnimationFrame(update);
    const outside = (event) => {
      if (!trigger.current?.contains(event.target) && !popup.current?.contains(event.target)) close();
    };
    const keydown = (event) => { if (event.key === "Escape") close(); };
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    document.addEventListener("mousedown", outside);
    document.addEventListener("keydown", keydown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      document.removeEventListener("mousedown", outside);
      document.removeEventListener("keydown", keydown);
    };
  }, [open, close]);
  return <>
    <Styled css={styles} className={inlineLabel ? styles.inlineWrap : styles.triggerWrap}>
      {inlineLabel && <Styled as="span" css={styles} className={styles.inlineLabel}>{inlineLabel}
        {required && <Styled as="span" css={styles} className={styles.inlineRequiredMark}>*</Styled>}
      </Styled>}
      <Styled as="button" css={styles} {...rest} ref={trigger} type="button" onClick={() => setOpen((previous) => !previous)} onBlur={onBlur}
        disabled={disabled} aria-expanded={open} aria-required={required} style={style}
        className={`${styles.button} ${type === "meeting" ? styles.meetingButton : ""} ${disabled ? styles.disabled : ""} ${inlineLabel ? styles.buttonInline : ""} ${className || ""}`}>
        {value ? persianDigits(value) : placeholder}
      </Styled>
    </Styled>
    {open && !disabled && createPortal(<Styled css={styles} ref={popup} className={styles.popper}
      style={{ ...position, maxHeight: "calc(100vh - 16px)", overflowY: "auto" }}>
      <TimePicker value={value || "08:00"} onChange={(next) => {
        onChange?.(next); queueMicrotask(close);
      }} onClose={close} />
    </Styled>, document.body)}
  </>;
}
export default withAppearance(TimePickerTrigger);
