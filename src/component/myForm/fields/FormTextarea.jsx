"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormTextarea({
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
  rows = 4,
  height,
  minHeight,
  maxHeight,
  resize = "vertical",
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormTextarea must be used within a Form");
  }
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
  if (validate) {
    rules.validate = validate;
  }
  const title = labelShort || label;
  const inlineStyle = {
    ...(height ? {
      height
    } : {}),
    ...(minHeight ? {
      minHeight
    } : {}),
    ...(maxHeight ? {
      maxHeight
    } : {}),
    resize: resize === false ? "none" : resize
  };
  return <Controller required={required} requiredMessage={requiredMessage} name={name} control={control} rules={rules} render={({
    field,
    fieldState
  }) => <Styled as="div" css={styles} className={styles.fieldContainer} data-form-field={name}>
          {title && <Styled as="label" css={styles} className={styles.label}>
              {title}
              {required && <Styled as="span" css={styles} className={styles.required}>*</Styled>}
            </Styled>}
          <Styled as="textarea" css={styles} {...field} rows={rows} placeholder={placeholder} disabled={disabled} readOnly={readOnly} style={inlineStyle} className={`${styles.textarea} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormTextarea);
