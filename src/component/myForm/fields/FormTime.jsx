"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import TimePickerTrigger from "../TimePicker/TimePickerTrigger";
import styles from "./Field.module.css";
function FormTime({
  name,
  label,
  labelShort,
  placeholder,
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
    throw new Error("FormTime must be used within a Form");
  }
  const rules = {};
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
          <TimePickerTrigger placeholder={placeholder} className={className} onBlur={field.onBlur} inputRef={field.ref} name={field.name} value={field.value ?? ""} onChange={field.onChange} disabled={disabled} inlineLabel={inline ? title : undefined} required={required} {...rest} />
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormTime);
