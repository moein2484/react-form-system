"use client";
import { useRef } from "react";
import { Styled, withAppearance } from "../core/Appearance";
import TimeColumn from "./TimeColumn";
import styles from "./TimePicker.module.css";
const hours = Array.from({ length: 24 }, (_, index) => index);
const minutes = Array.from({ length: 60 }, (_, index) => index);
function TimePicker({ value = "08:00", onChange }) {
  const [hour, minute] = value.split(":").map(Number);
  const pending = useRef(value);
  const previous = useRef(value);
  const change = (part, next) => {
    if (previous.current !== value) pending.current = value;
    previous.current = value;
    const parts = pending.current.split(":");
    parts[part] = String(next).padStart(2, "0");
    pending.current = parts.join(":");
    onChange?.(pending.current);
  };
  return <Styled css={styles} className={styles.paper}>
    <Styled css={styles} className={styles.columnsContainer}>
      <TimeColumn label="ساعت" items={hours} value={hour} onChange={next => change(0, next)} />
      <TimeColumn label="دقیقه" items={minutes} value={minute} onChange={next => change(1, next)} />
    </Styled>
  </Styled>;
}
export default withAppearance(TimePicker);