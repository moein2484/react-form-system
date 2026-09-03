"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import styles from "./SearchableSelect.module.css";

export default function SearchableSelect({
  value,
  onChange,
  options = [],
  labelKey = "name",
  valueKey = "id",
  placeholder = "انتخاب کنید...",
  disabled,
  loading,
  loadingText = "در حال بارگذاری...",
  searchable = true,
  renderContent,
  renderSelected,
  addItemLabel,
  onAddItem,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.trim().toLowerCase();
    return options.filter((opt) => {
      const label = String(opt[labelKey] || "").toLowerCase();
      return label.includes(q);
    });
  }, [options, search, labelKey]);

  const hasValue = value !== "" && value !== null && value !== undefined;

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optValue) => {
    onChange(optValue);
    setSearch("");
    setIsOpen(false);
  };

  const handleAddItem = () => {
    if (onAddItem) onAddItem();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target) &&
          dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const getSelectedOption = () => {
    if (!hasValue) return null;
    return options.find((o) => String(o[valueKey]) === String(value));
  };

  const selected = getSelectedOption();

  return (
    <div className={styles.formControl}>
      <div
        ref={selectRef}
        className={`${styles.selectContainer} ${disabled ? styles.disabled : ""}`}
        onClick={handleSelectClick}
      >
        <span className={styles.placeholderLabel}>{placeholder}</span>
        <div className={styles.selectValue}>
          {hasValue && selected ? (
            <>
              {renderContent ? (
                renderContent(selected)
              ) : renderSelected && selected ? (
                renderSelected(selected)
              ) : (
                <span>{selected[labelKey]}</span>
              )}
            </>
          ) : hasValue ? (
            <span>{String(value)}</span>
          ) : loading ? (
            <span className={styles.placeholderText}>{loadingText}</span>
          ) : (
            <span className={styles.placeholderText}>{placeholder}</span>
          )}
        </div>
        <div className={styles.arrowIcon}>▼</div>
      </div>

      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {searchable && (
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          )}

          <div className={styles.optionsContainer}>
            {loading ? (
              <div className={styles.optionItem}>
                {loadingText}
              </div>
            ) : filtered.length === 0 ? (
              <div className={styles.optionItem}>
                نتیجه‌ای یافت نشد
              </div>
            ) : (
              filtered.map((opt) => (
                <div
                  key={opt[valueKey]}
                  className={`${styles.optionItem} ${String(opt[valueKey]) === String(value) ? styles.selected : ""}`}
                  onClick={() => handleOptionClick(opt[valueKey])}
                >
                  {renderContent ? renderContent(opt) : opt[labelKey]}
                </div>
              ))
            )}

            {onAddItem && (
              <div
                className={styles.addItemButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddItem();
                }}
              >
                {addItemLabel || "+ افزودن"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
