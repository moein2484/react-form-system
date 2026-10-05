"use client";

import { Styled, withAppearance } from "./core/Appearance";
import { useImperativeHandle, useState, useMemo, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "./SearchableSelect.module.css";
const ArrowIcon = ({
  open
}) => <Styled as="svg" css={styles} className={`${styles.arrowIcon} ${open ? styles.arrowIconOpen : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Styled>;
function SearchableSelect({
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
  error = false,
  minDropdownWidth = 0, className, style, onBlur, inputRef, name, ...rest
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState(null);
  const selectRef = useRef(null);
  useImperativeHandle(inputRef, () => selectRef.current);
  const dropdownRef = useRef(null);

  // مقدار انتخابی — در حالت چندگانه آرایه است، در غیر این صورت اسکالر
  const selectedValues = multiple ? Array.isArray(value) ? value.filter(v => v !== "" && v !== null && v !== undefined) : [] : value !== "" && value !== null && value !== undefined ? [value] : [];
  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.trim().toLowerCase();
    return options.filter(opt => {
      const label = String(opt[labelKey] || "").toLowerCase();
      return label.includes(q);
    });
  }, [options, search, labelKey]);
  const getOption = v => options.find(o => String(o[valueKey]) === String(v));
  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  const handleOptionClick = optValue => {
    if (disabled) return;
    queueMicrotask(() => onBlur?.());
    if (multiple) {
      const next = selectedValues.some(v => String(v) === String(optValue)) ? selectedValues.filter(v => String(v) !== String(optValue)) : [...selectedValues, optValue];
      onChange(next);
    } else {
      onChange(optValue);
      setSearch("");
      setIsOpen(false);
    }
  };
  const handleRemoveChip = (optValue, e) => {
    e.stopPropagation();
    if (disabled) return;
    queueMicrotask(() => onBlur?.());
    const next = selectedValues.filter(v => String(v) !== String(optValue));
    onChange(next);
  };
  const closeDropdown = useCallback(() => {
    setSearch("");
    setIsOpen(false);
    onBlur?.();
  }, [onBlur]);
  const handleAddItem = () => {
    // تابع مشترک «بستن لیست» به onAddItem داده می‌شود تا مصرف‌کننده بتواند
    // مثلاً بعد از بازکردن مودال، لیست آیتم‌ها را ببندد.
    if (onAddItem) onAddItem(closeDropdown);
  };
  const isEmpty = selectedValues.length === 0;
  useEffect(() => {
    const handleClickOutside = e => {
      if (selectRef.current && !selectRef.current.contains(e.target) && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };
    const handleEscape = e => {
      if (e.key === "Escape") closeDropdown();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeDropdown]);

  // محاسبه موقعیت هوشمند دراپ‌داون (بالا/پایین + محدود به viewport)
  const computePosition = useCallback(() => {
    const selectEl = selectRef.current;
    const ddEl = dropdownRef.current;
    if (!selectEl || !ddEl) return null;
    const rect = selectEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 6;
    const ddHeight = ddEl.offsetHeight || 0;
    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;

    // اگر پایین جا کافی نیست، بالا باز شو
    const up = spaceBelow < ddHeight + margin && spaceAbove > spaceBelow;
    const minW = Number(minDropdownWidth) || 0;
    const width = Math.max(80, Math.min(Math.max(rect.width, minW), vw - 16));
    const right = Math.min(Math.max(8, vw - rect.right), Math.max(8, vw - width - 8));
    const style = {
      position: "fixed",
      right,
      width,
      zIndex: 20000
    };
    const avail = up ? spaceAbove : spaceBelow;
    style[up ? "bottom" : "top"] = (up ? vh - rect.top : rect.bottom) + margin;
    const optionsEl = ddEl.querySelector('[data-slot~="optionsContainer"]');
    const searchH = optionsEl ? optionsEl.offsetTop : 0;
    const optionsMaxHeight = Math.max(80, avail - margin - searchH);
    return {
      style,
      up,
      optionsMaxHeight
    };
  }, [minDropdownWidth]);
  useLayoutEffect(() => {
    let rafA;
    let rafB;
    const recompute = () => {
      if (!isOpen) {
        setDropdownPos(null);
        return;
      }
      setDropdownPos(computePosition());
    };

    // چهارچوب اول: دراپ‌داون رندر شده ولی هنوز لِی‌اوت کامل نشده؛
    // پس در فریم‌های دوم و بعد دوباره اندازه‌گیری می‌شود تا ارتفاع واقعی اعمال شود.
    rafA = requestAnimationFrame(() => {
      recompute();
      rafB = requestAnimationFrame(recompute);
    });
    window.addEventListener("resize", recompute);
    window.addEventListener("scroll", recompute, true);
    return () => {
      cancelAnimationFrame(rafA);
      cancelAnimationFrame(rafB);
      window.removeEventListener("resize", recompute);
      window.removeEventListener("scroll", recompute, true);
    };
  }, [isOpen, computePosition, filtered.length, loading, value]);
  const dropdown = isOpen && !disabled && typeof document !== "undefined";
  return <Styled as="div" css={styles} className={styles.formControl}>
      <Styled as="div" css={styles} className={`${inlineLabel ? styles.inlineWrap : undefined} ${error ? styles.inlineWrapError : ""}`}>
        {inlineLabel && <Styled as="span" css={styles} className={styles.inlineLabel}>
            {inlineLabel}
            {required && <Styled as="span" css={styles} className={styles.inlineRequiredMark}>*</Styled>}
          </Styled>}
        <Styled as="div" css={styles} ref={selectRef} {...rest} style={style} role="combobox" aria-expanded={isOpen} aria-disabled={disabled} aria-required={required} aria-invalid={error} tabIndex={disabled ? -1 : 0} onBlur={onBlur} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "Enter" || event.key === " ") { event.preventDefault(); handleSelectClick(); } }} className={`${styles.selectContainer} ${disabled ? styles.disabled : ""} ${isOpen ? styles.selectOpen : ""} ${inlineLabel ? styles.selectInline : ""} ${error ? styles.error : ""} ${className || ""}`} onClick={handleSelectClick} data-empty={isEmpty ? "true" : "false"}>
        {isEmpty && <Styled as="span" css={styles} className={styles.placeholderText}>
            {loading ? loadingText : placeholder}
          </Styled>}

        {!isEmpty && <Styled as="div" css={styles} className={styles.selectedArea}>
            {multiple ? selectedValues.map(v => {
            const opt = getOption(v);
            if (!opt) return null;
            return <Styled as="span" css={styles} key={String(v)} className={styles.chip}>
                    {renderChip ? renderChip(opt) : renderContent ? renderContent(opt) : <Styled as="span" css={styles} className={styles.chipLabel}>{opt[labelKey]}</Styled>}
                    <Styled as="button" css={styles} type="button" disabled={disabled} className={styles.chipRemove} onClick={e => handleRemoveChip(v, e)} aria-label="حذف">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </Styled>
                  </Styled>;
          }) : <Styled as="span" css={styles} className={styles.singleValue}>
                {renderSelected && getOption(selectedValues[0]) ? renderSelected(getOption(selectedValues[0])) : renderContent && getOption(selectedValues[0]) ? renderContent(getOption(selectedValues[0])) : getOption(selectedValues[0]) ? getOption(selectedValues[0])[labelKey] : String(selectedValues[0])}
              </Styled>}
          </Styled>}

        <ArrowIcon open={isOpen} />
      </Styled>
      </Styled>

      {dropdown && createPortal(<Styled as="div" css={styles} ref={dropdownRef} className={`${styles.dropdown} ${dropdownPos && dropdownPos.up ? styles.openUp : ""}`} style={dropdownPos ? dropdownPos.style : {
      visibility: "hidden",
      position: "fixed",
      top: -9999,
      left: -9999
    }}>
            {searchable && <Styled as="div" css={styles} className={styles.searchContainer}>
                <Styled as="svg" css={styles} className={styles.searchSvgIcon} width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </Styled>
                <Styled as="input" css={styles} type="text" className={styles.searchInput} placeholder="جستجو..." value={search} onChange={e => setSearch(e.target.value)} onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === "Escape") closeDropdown(); e.stopPropagation(); }} />
              </Styled>}

            <Styled as="div" css={styles} className={styles.optionsContainer} style={dropdownPos ? {
        maxHeight: dropdownPos.optionsMaxHeight
      } : undefined}>
              {loading ? <Styled as="div" css={styles} className={styles.optionItem}>{loadingText}</Styled> : filtered.length === 0 ? <Styled as="div" css={styles} className={styles.optionItem}>نتیجه‌ای یافت نشد</Styled> : filtered.map(opt => {
          const optValue = opt[valueKey];
          const isSelected = selectedValues.some(v => String(v) === String(optValue));
          return <Styled as="div" css={styles} key={String(optValue)} role="option" aria-selected={isSelected} tabIndex={0} onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); handleOptionClick(optValue); } }} className={`${styles.optionItem} ${isSelected ? styles.selected : ""}`} onClick={() => handleOptionClick(optValue)}>
                      {multiple && <Styled as="span" css={styles} className={`${styles.checkMark} ${isSelected ? styles.checkMarkActive : ""}`}>
                          {isSelected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>}
                        </Styled>}
                      <Styled as="span" css={styles} className={styles.optionContent}>
                        {renderContent ? renderContent(opt) : opt[labelKey]}
                      </Styled>
                    </Styled>;
        })}

              {onAddItem && <Styled as="div" css={styles} className={styles.addItemButton} onClick={e => {
          e.stopPropagation();
          handleAddItem();
        }}>
                  <Styled as="span" css={styles} className={styles.addItemIcon}>+</Styled>
                  {addItemLabel || "افزودن"}
                </Styled>}
            </Styled>
          </Styled>, document.body)}
    </Styled>;
}
export default withAppearance(SearchableSelect);
