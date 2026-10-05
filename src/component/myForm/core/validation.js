export const isEmptyValue = (value) => value == null || value === "" ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === "number" && Number.isNaN(value));

// Empty optional fields bypass every other validator. Required always has priority.
export function fieldRules({ required, requiredMessage = "این فیلد الزامی است", boolean = false, rules = {} }) {
  return { validate: async (value, values) => {
    if (isEmptyValue(value) || (boolean && value === false)) return required ? requiredMessage : true;
    const message = (rule, fallback) => typeof rule === "object" ? rule.message || fallback : fallback;
    const limit = (rule) => typeof rule === "object" ? rule.value : rule;
    if (rules.min != null && value < limit(rules.min)) return message(rules.min, "مقدار کمتر از حد مجاز است");
    if (rules.max != null && value > limit(rules.max)) return message(rules.max, "مقدار بیشتر از حد مجاز است");
    if (rules.minLength != null && String(value).length < limit(rules.minLength)) return message(rules.minLength, "طول مقدار کمتر از حد مجاز است");
    if (rules.maxLength != null && String(value).length > limit(rules.maxLength)) return message(rules.maxLength, "طول مقدار بیشتر از حد مجاز است");
    if (rules.pattern) {
      const regex = new RegExp(limit(rules.pattern));
      if (!regex.test(String(value))) return message(rules.pattern, "فرمت وارد شده معتبر نیست");
    }
    const validators = typeof rules.validate === "function" ? [rules.validate] : Object.values(rules.validate || {});
    for (const validate of validators) {
      const result = await validate(value, values);
      if (typeof result === "string") return result;
      if (result === false) return "اعتبارسنجی ناموفق بود";
    }
    return true;
  } };
}
