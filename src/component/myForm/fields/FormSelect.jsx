"use client";

import { Styled, withAppearance } from "../core/Appearance";
import { useFormContext } from "../core/FormProvider";
import Controller from "../core/FieldController";
import SearchableSelect from "../SearchableSelect";
import styles from "./Field.module.css";
function FormSelect({
  name,
  label,
  labelShort,
  placeholder,
  required = false,
  requiredMessage = "این فیلد الزامی است",
  validate,
  disabled,
  options = [],
  valueKey = "value",
  labelKey = "label",
  searchable = false,
  loading,
  loadingText,
  renderContent,
  renderSelected,
  renderChip,
  addItemLabel,
  onAddItem,
  multiple = false,
  minDropdownWidth,
  className,
  ...rest
}) {
  const {
    control
  } = useFormContext();
  if (!control) {
    throw new Error("FormSelect must be used within a Form");
  }
  const rules = { validate };
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
          <SearchableSelect className={className} onBlur={field.onBlur} inputRef={field.ref} name={field.name} value={field.value ?? ""} onChange={field.onChange} placeholder={placeholder || "انتخاب کنید..."} disabled={disabled} options={options} labelKey={labelKey} valueKey={valueKey} searchable={searchable} loading={loading} loadingText={loadingText} renderContent={renderContent} renderSelected={renderSelected} renderChip={renderChip} addItemLabel={addItemLabel} onAddItem={onAddItem} multiple={multiple} minDropdownWidth={minDropdownWidth} inlineLabel={inline ? title : undefined} required={required} error={!!fieldState.error} {...rest} />
          {fieldState.error && <Styled as="span" css={styles} role="alert" className={styles.errorMessage}>{fieldState.error.message}</Styled>}
        </Styled>} />;
}
export default withAppearance(FormSelect);
