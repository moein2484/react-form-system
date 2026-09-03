"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import styles from "./SearchableSelect.module.css";

const ArrowIcon = ({ open }) => (
  <svg
    className={`${styles.arrowIcon} ${open ? styles.arrowIconOpen : ""}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
  multiple = false,
  renderChip,
  inlineLabel,
  required,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // مقدار انتخابی — در حالت چندگانه آرایه است، در غیر این صورت اسکالر
  const selectedValues = multiple
    ? Array.isArray(value)
      ? value.filter((v) => v !== "" && v !== null && v !== undefined)
      : []
    : value !== "" && value !== null && value !== undefined
      ? [value]
      : [];

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.trim().toLowerCase();
    return options.filter((opt) => {
      const label = String(opt[labelKey] || "").toLowerCase();
      return label.includes(q);
    });
  }, [options, search, labelKey]);

  const getOption = (v) =>
    options.find((o) => String(o[valueKey]) === String(v));

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optValue) => {
    if (multiple) {
      const next = selectedValues.some((v) => String(v) === String(optValue))
        ? selectedValues.filter((v) => String(v) !== String(optValue))
        : [...selectedValues, optValue];
      onChange(next);
    } else {
      onChange(optValue);
      setSearch("");
      setIsOpen(false);
    }
  };

  const handleRemoveChip = (optValue, e) => {
    e.stopPropagation();
    const next = selectedValues.filter(
      (v) => String(v) !== String(optValue),
    );
    onChange(next);
  };

  const handleAddItem = () => {
    if (onAddItem) onAddItem();
  };

  const isEmpty = selectedValues.length === 0 && !loading;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
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

  return (
    <div className={styles.formControl}>
      <div className={inlineLabel ? styles.inlineWrap : undefined}>
        {inlineLabel && (
          <span className={styles.inlineLabel}>
            {inlineLabel}
            {required && <span className={styles.inlineRequiredMark}>*</span>}
          </span>
        )}
        <div
          ref={selectRef}
          className={`${styles.selectContainer} ${
            disabled ? styles.disabled : ""
          } ${isOpen ? styles.selectOpen : ""} ${
            inlineLabel ? styles.selectInline : ""
          }`}
          onClick={handleSelectClick}
          data-empty={isEmpty ? "true" : "false"}
        >
        {isEmpty && (
          <span className={styles.placeholderText}>
            {loading ? loadingText : placeholder}
          </span>
        )}

        {!isEmpty && (
          <div className={styles.selectedArea}>
            {multiple ? (
              selectedValues.map((v) => {
                const opt = getOption(v);
                if (!opt) return null;
                return (
                  <span key={String(v)} className={styles.chip}>
                    {renderChip ? (
                      renderChip(opt)
                    ) : renderContent ? (
                      renderContent(opt)
                    ) : (
                      <span className={styles.chipLabel}>{opt[labelKey]}</span>
                    )}
                    <button
                      type="button"
                      className={styles.chipRemove}
                      onClick={(e) => handleRemoveChip(v, e)}
                      aria-label="حذف"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </span>
                );
              })
            ) : (
              <span className={styles.singleValue}>
                {renderContent ? (
                  renderContent(getOption(selectedValues[0]))
                ) : renderSelected && getOption(selectedValues[0]) ? (
                  renderSelected(getOption(selectedValues[0]))
                ) : getOption(selectedValues[0]) ? (
                  getOption(selectedValues[0])[labelKey]
                ) : (
                  String(selectedValues[0])
                )}
              </span>
            )}
          </div>
        )}

        <ArrowIcon open={isOpen} />
      </div>
      </div>

      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {searchable && (
            <div className={styles.searchContainer}>
              <svg
                className={styles.searchSvgIcon}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 20l-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="جستجو..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className={styles.optionsContainer}>
            {loading ? (
              <div className={styles.optionItem}>{loadingText}</div>
            ) : filtered.length === 0 ? (
              <div className={styles.optionItem}>نتیجه‌ای یافت نشد</div>
            ) : (
              filtered.map((opt) => {
                const optValue = opt[valueKey];
                const isSelected = selectedValues.some(
                  (v) => String(v) === String(optValue),
                );
                return (
                  <div
                    key={String(optValue)}
                    className={`${styles.optionItem} ${
                      isSelected ? styles.selected : ""
                    }`}
                    onClick={() => handleOptionClick(optValue)}
                  >
                    {multiple && (
                      <span
                        className={`${styles.checkMark} ${
                          isSelected ? styles.checkMarkActive : ""
                        }`}
                      >
                        {isSelected && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M5 12l4 4L19 6"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                    )}
                    <span className={styles.optionContent}>
                      {renderContent ? renderContent(opt) : opt[labelKey]}
                    </span>
                  </div>
                );
              })
            )}

            {onAddItem && (
              <div
                className={styles.addItemButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddItem();
                }}
              >
                <span className={styles.addItemIcon}>+</span>
                {addItemLabel || "افزودن"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}