"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import styles from "./Field.module.css";
function FormNumber({
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
  step,
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  asString = false,
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
    throw new Error("FormNumber must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  if (asString) {
    // حالت رشته‌ای — مقدار به‌صورت string ذخیره می‌شود تا با مقادیر
    // رشته‌ای (مثل کد ملی، کد پستی و...) سازگار باشد
    if (min !== undefined || max !== undefined) {
      rules.validate = {
        range: v => {
          const parsed = v === "" || v == null ? NaN : Number(v);
          if (min !== undefined && (Number.isNaN(parsed) || parsed < min)) return minMessage || `مقدار باید حداقل ${min} باشد`;
          if (max !== undefined && (Number.isNaN(parsed) || parsed > max)) return maxMessage || `مقدار باید حداکثر ${max} باشد`;
          return true;
        },
        ...(validate ? {
          custom: validate
        } : {})
      };
    } else if (validate) {
      rules.validate = validate;
    }
    if (minLength) {
      rules.minLength = {
        value: minLength,
        message: minLengthMessage || `حداقل ${minLength} کاراکتر`
      };
    }
    if (maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: maxLengthMessage || `حداکثر ${maxLength} کاراکتر`
      };
    }
  } else {
    if (min !== undefined) {
      rules.min = {
        value: min,
        message: minMessage || `مقدار باید حداقل ${min} باشد`
      };
    }
    if (max !== undefined) {
      rules.max = {
        value: max,
        message: maxMessage || `مقدار باید حداکثر ${max} باشد`
      };
    }
    if (validate) {
      rules.validate = validate;
    }
  }
  const title = labelShort || label;
  const inline = Boolean(labelShort);
  const handleChange = (field, e) => field.onChange(e.target.value === "" ? "" : asString ? e.target.value : e.target.valueAsNumber);
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
              <Styled as="input" css={styles} {...field} type="number" placeholder={placeholder} disabled={disabled} readOnly={readOnly} min={min} max={max} step={step} onChange={e => handleChange(field, e)} className={`${styles.inputInline} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />
            </Styled> : <Styled as="input" css={styles} {...field} type="number" placeholder={placeholder} disabled={disabled} readOnly={readOnly} min={min} max={max} step={step} onChange={e => handleChange(field, e)} className={`${styles.input} ${fieldState.error ? styles.error : ""} ${className || ""}`} {...rest} />}
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormNumber);
