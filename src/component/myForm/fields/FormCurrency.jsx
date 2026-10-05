"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import CurrencyInput from "../CurrencyInput";
import { numberToPersianWords } from "../utils/persianWords";
import styles from "./Field.module.css";
function FormCurrency({
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
  showPriceWords = false,
  priceWordsUnit = "تومان",
  asString = false,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormCurrency must be used within a Form");
  }

  // ساختن rules برای validation
  const rules = {};
  if (min !== undefined) {
    rules.min = {
      value: min,
      message: minMessage || `مبلغ باید حداقل ${min} باشد`
    };
  }
  if (max !== undefined) {
    rules.max = {
      value: max,
      message: maxMessage || `مبلغ باید حداکثر ${max} باشد`
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
  }) => {
    const priceWords = showPriceWords && (field.value || field.value === 0) ? numberToPersianWords(field.value) : "";
    return <Styled as="div" css={styles} className={styles.fieldContainer} data-form-field={name}>
                {title && !inline && <Styled as="label" css={styles} className={styles.label}>
                    {title}
                    {required && <Styled as="span" css={styles} className={styles.required}>*</Styled>}
                  </Styled>}
                <CurrencyInput error={Boolean(fieldState.error)} className={className} onBlur={field.onBlur} inputRef={field.ref} name={field.name} value={field.value ?? ""} onChange={value => field.onChange(value)} placeholder={placeholder} disabled={disabled} inlineLabel={inline ? title : undefined} required={required} asString={asString} {...rest} />
                {priceWords ? <Styled as="span" css={styles} className={styles.wording}>
                    {priceWords} {priceWordsUnit}
                  </Styled> : null}
                {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
              </Styled>;
  }} />;
}
export default withAppearance(FormCurrency);
