"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useOptionalFormContext } from "../core/FormProvider";
import FormSubmit from "./FormSubmit";
import styles from "./Actions.module.css";
function FormActions({
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
    else if (form) document.getElementById(form)?.resetForm?.();
    if (onReset) onReset();
  };
  return <Styled as="div" css={styles} className={`${styles.actionsContainer} ${className || ""}`} {...rest}>
      {children || <>
          {showReset && <Styled as="button" css={styles} type="button" form={context ? undefined : form} onClick={handleReset} className={`${styles.resetButton} ${resetClassName || ""}`} style={resetStyle} disabled={context ? context.formState.isSubmitting : false} {...resetProps}>
              {resetText}
            </Styled>}
          <FormSubmit form={form} className={submitClassName} style={submitStyle} {...submitProps}>
            {submitText}
          </FormSubmit>
        </>}
    </Styled>;
}
export default withAppearance(FormActions);
