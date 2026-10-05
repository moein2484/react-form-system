"use client";
import { useEffect, useRef } from "react";
import { Styled, withAppearance } from "../core/Appearance";
import styles from "./TimeColumn.module.css";
const digits = value => String(value).padStart(2, "0").replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
function TimeColumn({ label, items, value, onChange }) {
  const wheel = useRef(null);
  const timer = useRef(null);
  const scrolling = useRef(false);
  const callback = useRef(onChange);
  useEffect(() => { callback.current = onChange; }, [onChange]);
  useEffect(() => {
    const element = wheel.current;
    if (!scrolling.current && element) {
      element.scrollTop = items.indexOf(value) * (element.querySelector('[role="option"]')?.offsetHeight || 36);
    }
  }, [value, items]);
  useEffect(() => () => clearTimeout(timer.current), []);
  const select = index => {
    const element = wheel.current;
    element.scrollTo({ top: Math.max(0, Math.min(items.length - 1, index)) * element.querySelector('[role="option"]').offsetHeight, behavior: "smooth" });
  };
  const settle = () => {
    const element = wheel.current;
    const height = element.querySelector('[role="option"]').offsetHeight;
    const index = Math.max(0, Math.min(items.length - 1, Math.round(element.scrollTop / height)));
    element.scrollTop = index * height;
    scrolling.current = false;
    if (items[index] !== value) callback.current(items[index]);
  };
  return <Styled css={styles} className={styles.container}>
    <Styled css={styles} className={styles.label}>{label}</Styled>
    <Styled css={styles} className={styles.wheelWrap}>
      <Styled css={styles} className={styles.selectionBand} aria-hidden="true" />
      <Styled css={styles} className={styles.itemsContainer} ref={wheel} role="listbox" aria-label={label} tabIndex={0}
        onScroll={() => { scrolling.current = true; clearTimeout(timer.current); timer.current = setTimeout(settle, 120); }}
        onKeyDown={event => {
          const index = items.indexOf(value);
          const next = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: items.length - 1, PageDown: index + 5, PageUp: index - 5 }[event.key];
          if (next !== undefined) { event.preventDefault(); select(next); }
        }}>
        {items.map((item, index) => <Styled css={styles} key={item} role="option" aria-selected={item === value}
          onClick={() => item === value ? callback.current(item) : select(index)}
          className={[styles.itemButton, item === value ? styles.active : ""].join(" ")}>
          {digits(item)}
        </Styled>)}
      </Styled>
    </Styled>
  </Styled>;
}
export default withAppearance(TimeColumn);
