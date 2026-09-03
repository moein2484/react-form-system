"use client";

import FormSelect from "./FormSelect";

// کامپوننت سازگاری عقب‌گرد - فقط FormSelect را با searchable فعال صدا می‌زند
export default function FormSearchableSelect(props) {
  return <FormSelect {...props} searchable />;
}
