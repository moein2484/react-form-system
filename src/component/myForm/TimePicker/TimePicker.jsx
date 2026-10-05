"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { motion } from "framer-motion";
import TimeColumn from "./TimeColumn";
import ActionButtons from "./ActionButtons";
import { useTimePicker } from "./useTimePicker";
import styles from "./TimePicker.module.css";
const MotionDiv = motion.div;
function TimePicker({
  value = "08:00",
  onChange,
  onClose
}) {
  const {
    tempTime,
    setHour,
    setMinute,
    formatted
  } = useTimePicker(value);
  const hours = Array.from({
    length: 24
  }, (_, i) => i);
  const minutes = Array.from({
    length: 60
  }, (_, i) => i);
  const handleConfirm = () => {
    onChange?.(formatted);
    onClose?.();
  };
  return <Styled as={MotionDiv} css={styles} initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} exit={{
    opacity: 0,
    scale: 0.9
  }} className={styles.paper} onSubmitCapture={e => e.preventDefault()}>
      <Styled as="div" css={styles} className={styles.columnsContainer}>
        <TimeColumn label="ساعت" items={hours} value={tempTime.hour} onChange={setHour} />
        <TimeColumn label="دقیقه" items={minutes} value={tempTime.minute} onChange={setMinute} />
      </Styled>

      <ActionButtons onConfirm={handleConfirm} onCancel={onClose} />
    </Styled>;
}
export default withAppearance(TimePicker);
