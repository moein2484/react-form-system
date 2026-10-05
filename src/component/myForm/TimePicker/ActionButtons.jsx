"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { motion } from "framer-motion";
import styles from "./ActionButtons.module.css";
const MotionButton = motion.button;
function ActionButtons({
  onConfirm,
  onCancel
}) {
  return <Styled as="div" css={styles} className={styles.container}>
      <Styled as={MotionButton} css={styles} type="button" whileTap={{
      scale: 0.95
    }} onMouseDown={e => e.preventDefault()} onClick={onCancel} className={styles.cancelButton}>
        انصراف
      </Styled>

      <Styled as={MotionButton} css={styles} type="button" whileTap={{
      scale: 0.95
    }} onMouseDown={e => e.preventDefault()} onClick={onConfirm} className={styles.confirmButton}>
        تأیید
      </Styled>
    </Styled>;
}
export default withAppearance(ActionButtons);
