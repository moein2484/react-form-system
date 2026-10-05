"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormPercentage({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  min = 0,
  minMessage,
  max = 100,
  maxMessage,
  step = 0.01,
  validate,
  disabled,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormPercentage must be used within a Form");
  }
  const rules = {};
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `درصد باید حداقل ${min} باشد`
    };
  }
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `درصد باید حداکثر ${max} باشد`
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
              <Styled as="input" css={styles} {...field} type="number" placeholder={placeholder} disabled={disabled} min={min} max={max} step={step} onChange={e => field.onChange(e.target.value === "" ? "" : e.target.valueAsNumber)} className={`${styles.inputInline} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
              <Styled as="span" css={styles} className={styles.inlineSymbol}>%</Styled>
            </Styled> : <Styled as="div" css={styles} className={styles.percentageContainer}>
              <Styled as="input" css={styles} {...field} type="number" placeholder={placeholder} disabled={disabled} min={min} max={max} step={step} onChange={e => field.onChange(e.target.value === "" ? "" : e.target.valueAsNumber)} className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
              <Styled as="span" css={styles} className={styles.percentageSymbol}>%</Styled>
            </Styled>}
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormPercentage);
