"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useState } from "react";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormPassword({
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
  validate,
  disabled,
  readOnly,
  showToggle = true,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  if (!control) {
    throw new Error("FormPassword must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  if (minLength) {
    rules.minLength = {
      value: minLength,
      message: minLengthMessage || `رمز عبور حداقل باید ${minLength} کاراکتر باشد`
    };
  }
  if (maxLength) {
    rules.maxLength = {
      value: maxLength,
      message: maxLengthMessage || `رمز عبور حداکثر باید ${maxLength} کاراکتر باشد`
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
              <Styled as="input" css={styles} {...field} type={showPassword ? "text" : "password"} placeholder={placeholder} disabled={disabled} readOnly={readOnly} className={`${styles.inputInline} ${showToggle ? styles.inputInlineWithToggle : ""} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
              {showToggle && <Styled as="button" css={styles} type="button" className={styles.passwordInlineToggle} onClick={() => setShowPassword(!showPassword)} disabled={disabled || readOnly}>
                  {showPassword ? "👁️" : "🔒"}
                </Styled>}
            </Styled> : <Styled as="div" css={styles} className={styles.passwordContainer}>
              <Styled as="input" css={styles} {...field} type={showPassword ? "text" : "password"} placeholder={placeholder} disabled={disabled} readOnly={readOnly} className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
              {showToggle && <Styled as="button" css={styles} type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)} disabled={disabled || readOnly}>
                  {showPassword ? "👁️" : "🔒"}
                </Styled>}
            </Styled>}
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormPassword);
