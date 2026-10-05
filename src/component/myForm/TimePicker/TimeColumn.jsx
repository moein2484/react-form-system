"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { motion } from "framer-motion";
import styles from "./TimeColumn.module.css";
const MotionButton = motion.button;
const toPersianDigits = str => String(str).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
function TimeColumn({
  label,
  items,
  value,
  onChange
}) {
  return <Styled as="div" css={styles} className={styles.container}>
      <Styled as="div" css={styles} className={styles.label}>{label}</Styled>

      <Styled as="div" css={styles} className={styles.itemsContainer}>
        {items.map(item => {
        const isActive = item === value;
        return <Styled as={MotionButton} css={styles} key={item} type="button" onMouseDown={e => e.preventDefault()} onClick={() => onChange(item)} className={`${styles.itemButton} ${isActive ? styles.active : ""}`}>
              {toPersianDigits(String(item).padStart(2, "0"))}
            </Styled>;
      })}
      </Styled>
    </Styled>;
}
export default withAppearance(TimeColumn);
