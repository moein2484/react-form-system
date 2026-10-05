"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import ShamsiDatePicker from "../ShamsiDatePicker";
import styles from "./Field.module.css";
function FormDate({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  min,
  minMessage,
  max,
  maxMessage,
  validate,
  disabled,
  error: propError,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormDate must be used within a Form");
  }
  const rules = {};
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `تاریخ باید بعد از ${min} باشد`
    };
  }
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `تاریخ باید قبل از ${max} باشد`
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
          <ShamsiDatePicker className={className} onBlur={field.onBlur} inputRef={field.ref} name={field.name} value={field.value ?? ""} onChange={field.onChange} placeholder={placeholder} disabled={disabled} error={fieldState.error?.message} inlineLabel={inline ? title : undefined} required={required} {...rest} />
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormDate);
