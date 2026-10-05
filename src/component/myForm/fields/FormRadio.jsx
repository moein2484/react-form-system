"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormRadio({
  name,
  label,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  validate,
  disabled,
  options = [],
  valueKey = "value",
  labelKey = "label",
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormRadio must be used within a Form");
  }
  const rules = {};
  if (validate) {
    rules.validate = validate;
  }
  return <Controller required={required} requiredMessage={requiredMessage} name={name} control={control} rules={rules} render={({
    field,
    fieldState
  }) => <Styled as="div" css={styles} className={styles.fieldContainer} data-form-field={name}>
          {label && <Styled as="label" css={styles} className={styles.label}>
              {label}
              {required && <Styled as="span" css={styles} className={styles.required}>*</Styled>}
            </Styled>}
          <Styled as="div" css={styles} style={rest.style} className={`${styles.radioContainer} ${className || ""}`}>
            {options.map(option => <Styled as="div" css={styles} key={option[valueKey]} className={styles.radioOption}>
                <Styled as="input" css={styles} {...field} type="radio" id={`${name}-${option[valueKey]}`} value={option[valueKey]} disabled={disabled} className={styles.radioInput} checked={field.value === option[valueKey]} onChange={e => field.onChange(option[valueKey])} {...rest} />
                <label htmlFor={`${name}-${option[valueKey]}`}>
                  {option[labelKey]}
                </label>
              </Styled>)}
          </Styled>
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormRadio);
