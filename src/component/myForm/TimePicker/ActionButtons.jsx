import { motion } from "framer-motion";
import styles from "./ActionButtons.module.css";

const MotionButton = motion.button;

export default function ActionButtons({ onConfirm, onCancel }) {
  return (
    <div className={styles.container}>
      <MotionButton
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onCancel}
        className={styles.cancelButton}
      >
        انصراف
      </MotionButton>

      <MotionButton
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onConfirm}
        className={styles.confirmButton}
      >
        تأیید
      </MotionButton>
    </div>
  );
}
