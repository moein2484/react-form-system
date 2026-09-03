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
  submitClassName,
  resetClassName,
  submitStyle,
  resetStyle,
  submitProps,
  resetProps,
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
              className={`${styles.resetButton} ${resetClassName || ""}`}
              style={resetStyle}
              disabled={formState.isSubmitting}
              {...resetProps}
            >
              {resetText}
            </button>
          )}
          <FormSubmit
            className={submitClassName}
            style={submitStyle}
            {...submitProps}
          >
            {submitText}
          </FormSubmit>
        </>
      )}
    </div>
  );
}
