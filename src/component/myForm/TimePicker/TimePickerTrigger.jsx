"use client"

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import TimePicker from "./TimePicker";
import styles from "./TimePickerTrigger.module.css";

const toPersianDigits = (str) =>
  String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);

export default function TimePickerTrigger({ value, onChange, type, disabled, inlineLabel, required }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popperRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - 260));
    setPosition({
      top: rect.bottom + 4,
      left,
    });
  }, [anchorEl]);

  const handleOpen = (e) => {
    if (disabled) return;
    setAnchorEl(e.currentTarget);
    setOpen(true);
    updatePosition();
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (open) {
      updatePosition();
      const handleResizeOrScroll = () => updatePosition();
      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll, true);
      document.addEventListener("scroll", handleResizeOrScroll, true);
      return () => {
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll, true);
        document.removeEventListener("scroll", handleResizeOrScroll, true);
      };
    }
  }, [open, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popperRef.current && !popperRef.current.contains(e.target) && anchorEl && !anchorEl.contains(e.target)) {
        handleClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl]);

  return (
    <>
      <div className={inlineLabel ? styles.inlineWrap : styles.triggerWrap}>
        {inlineLabel && (
          <span className={styles.inlineLabel}>
            {inlineLabel}
            {required && <span className={styles.inlineRequiredMark}>*</span>}
          </span>
        )}
        <button
          type="button"
          onClick={handleOpen}
          disabled={disabled}
          className={`${styles.button} ${type === "meeting" ? styles.meetingButton : ""} ${disabled ? styles.disabled : ""} ${inlineLabel ? styles.buttonInline : ""}`}
        >
          {toPersianDigits(value)}
        </button>
      </div>

      {open && (
        <div
          ref={popperRef}
          className={styles.popper}
          style={{ top: position.top, left: position.left }}
        >
          <AnimatePresence>
            <TimePicker
              value={value}
              onChange={(t) => {
                onChange(t);
                handleClose();
              }}
              onClose={handleClose}
            />
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
