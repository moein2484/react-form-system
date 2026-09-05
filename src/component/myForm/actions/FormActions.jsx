"use client";

import { useOptionalFormContext } from "../core/FormProvider";
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
  form,
  ...rest
}) {
  const context = useOptionalFormContext();

  const handleReset = () => {
    if (context) {
      context.reset();
    }
    if (onReset) onReset();
  };

  return (
    <div className={`${styles.actionsContainer} ${className || ""}`} {...rest}>
      {children || (
        <>
          {showReset && (
            <button
              type={context ? "button" : "reset"}
              form={context ? undefined : form}
              onClick={handleReset}
              className={`${styles.resetButton} ${resetClassName || ""}`}
              style={resetStyle}
              disabled={context ? context.formState.isSubmitting : false}
              {...resetProps}
            >
              {resetText}
            </button>
          )}
          <FormSubmit
            form={form}
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