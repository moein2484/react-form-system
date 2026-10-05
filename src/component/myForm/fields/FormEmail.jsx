"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormEmail({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  emailMessage = "ایمیل معتبر نیست",
  validate,
  disabled,
  readOnly,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormEmail must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};

  // Validation برای ایمیل
  rules.pattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: emailMessage
  };
  if (validate) {
    rules.validate = validate;
  }
  const title = labelShort || label;
  const inline = Boolean(labelShort);
  return <Controller required={required} requiredMessage={requiredMessage} name={name} control={control} rules={rules} render={({
    field,
    fieldState
  }) => <Styled as="div" css={styles} className={styles.fieldContainer} data-form-field={name}>
          {title && !inline && <Styled as="label" css={styles} className={styles.label}>
              {title}
              {required && <Styled as="span" css={styles} className={styles.required}>*</Styled>}
            </Styled>}
          {inline ? <Styled as="div" css={styles} className={`${styles.inlineWrap} ${disabled ? styles.disabled : ""}`}>
              {title && <Styled as="span" css={styles} className={styles.inlineLabel}>
                  {title}
                  {required && <Styled as="span" css={styles} className={styles.inlineRequiredMark}>*</Styled>}
                </Styled>}
              <Styled as="input" css={styles} {...field} type="email" placeholder={placeholder} disabled={disabled} readOnly={readOnly} className={`${styles.inputInline} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
            </Styled> : <Styled as="input" css={styles} {...field} type="email" placeholder={placeholder} disabled={disabled} readOnly={readOnly} className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />}
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormEmail);
