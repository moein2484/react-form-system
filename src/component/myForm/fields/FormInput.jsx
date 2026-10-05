"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormInput({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  pattern,
  patternMessage = "فرمت وارد شده معتبر نیست",
  validate,
  disabled,
  readOnly,
  type = "text",
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormInput must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  if (minLength) {
    rules.minLength = {
      value: minLength,
      message: minLengthMessage || `حداقل باید ${minLength} کاراکتر باشد`
    };
  }
  if (maxLength) {
    rules.maxLength = {
      value: maxLength,
      message: maxLengthMessage || `حداکثر باید ${maxLength} کاراکتر باشد`
    };
  }
  if (pattern) {
    rules.pattern = {
      value: new RegExp(pattern),
      message: patternMessage
    };
  }
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
              <Styled as="input" css={styles} {...field} type={type} placeholder={placeholder} disabled={disabled} readOnly={readOnly} className={`${styles.inputInline} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
            </Styled> : <Styled as="input" css={styles} {...field} type={type} placeholder={placeholder} disabled={disabled} readOnly={readOnly} className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />}
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormInput);
