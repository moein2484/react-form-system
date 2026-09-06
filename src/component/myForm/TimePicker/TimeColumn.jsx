"use client"

import { motion } from "framer-motion";
import styles from "./TimeColumn.module.css";

const MotionButton = motion.button;

const toPersianDigits = (str) =>
  String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

export default function TimeColumn({ label, items, value, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>

      <div className={styles.itemsContainer}>
        {items.map((item) => {
          const isActive = item === value;

          return (
            <MotionButton
              key={item}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onChange(item)}
              className={`${styles.itemButton} ${isActive ? styles.active : ""}`}
            >
              {toPersianDigits(String(item).padStart(2, "0"))}
            </MotionButton>
          );
        })}
      </div>
    </div>
  );
}
