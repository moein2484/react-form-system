"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import SearchableSelect from "../SearchableSelect";
import styles from "./Field.module.css";

export default function FormSelect({
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
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormSelect must be used within a Form");
  }

  const rules = {};

  if (required) {
    if (multiple) {
      rules.validate = {
        requiredOrEmpty: (v) =>
          Array.isArray(v) && v.length > 0
            ? true
            : requiredMessage,
        ...(validate ? { custom: validate } : {}),
      };
    } else {
      rules.required = requiredMessage;
      if (validate) {
        rules.validate = validate;
      }
    }
  } else if (validate) {
    rules.validate = validate;
  }

  const title = labelShort || label;
  const inline = Boolean(labelShort);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.fieldContainer} data-form-field={name}>
          {title && !inline && (
            <label className={styles.label}>
              {title}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
          <SearchableSelect
            value={field.value || ""}
            onChange={field.onChange}
            placeholder={placeholder || "انتخاب کنید..."}
            disabled={disabled}
            options={options}
            labelKey={labelKey}
            valueKey={valueKey}
            searchable={searchable}
            loading={loading}
            loadingText={loadingText}
            renderContent={renderContent}
            renderSelected={renderSelected}
            renderChip={renderChip}
            addItemLabel={addItemLabel}
            onAddItem={onAddItem}
            multiple={multiple}
            inlineLabel={inline ? title : undefined}
            required={required}
            error={!!fieldState.error}
            {...rest}
          />
          {fieldState.error && (
            <span className={styles.errorMessage}>{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  );
}
