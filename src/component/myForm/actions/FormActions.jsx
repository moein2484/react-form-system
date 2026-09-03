"use client";

import { useFormContext } from "../core/FormProvider";
import FormSubmit from "./FormSubmit";
import styles from "./Actions.module.css";

export default function FormActions({
  children,
  submitText = "ارسال",
  resetText = "بازنشانی",
  showReset = true,
  onReset,
  className,
  ...rest
}) {
  const { reset, formState } = useFormContext();

  const handleReset = () => {
    reset();
    if (onReset) onReset();
  };

  return (
    <div className={`${styles.actionsContainer} ${className || ""}`} {...rest}>
      {children || (
        <>
          {showReset && (
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetButton}
              disabled={formState.isSubmitting}
            >
              {resetText}
            </button>
          )}
          <FormSubmit>{submitText}</FormSubmit>
        </>
      )}
    </div>
  );
}
