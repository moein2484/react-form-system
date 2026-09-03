"use client";

import { useFormContext } from "../core/FormProvider";
import { Controller } from "react-hook-form";
import SearchableSelect from "../SearchableSelect";
import styles from "./Field.module.css";

export default function FormSelect({
  name,
  label,
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
  addItemLabel,
  onAddItem,
  className,
  ...rest
}) {
  const { control } = useFormContext();

  if (!control) {
    throw new Error("FormSelect must be used within a Form");
  }

  const rules = {};

  if (required) {
    rules.required = requiredMessage;
  }

  if (validate) {
    rules.validate = validate;
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={styles.fieldContainer} data-form-field={name}>
          {label && (
            <label className={styles.label}>
              {label}
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
            addItemLabel={addItemLabel}
            onAddItem={onAddItem}
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
