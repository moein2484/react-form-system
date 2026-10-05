"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormSwitch({
  name,
  label,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  validate,
  disabled,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormSwitch must be used within a Form");
  }
  const rules = {};
  if (validate) {
    rules.validate = validate;
  }
  return <Controller required={required} requiredMessage={requiredMessage} boolean name={name} control={control} rules={rules} render={({
    field,
    fieldState
  }) => <Styled as="div" css={styles} className={styles.fieldContainer} data-form-field={name}>
          <Styled as="div" css={styles} className={styles.switchContainer}>
            <Styled as="input" css={styles} {...field} type="checkbox" id={name} disabled={disabled} className={`${styles.switchInput} ${className || ""}`} checked={field.value || false} onChange={e => field.onChange(e.target.checked)} {...rest} />
            {label && <Styled as="label" css={styles} htmlFor={name} className={styles.label}>
                {label}
                {required && <Styled as="span" css={styles} className={styles.required}>*</Styled>}
              </Styled>}
          </Styled>
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormSwitch);
