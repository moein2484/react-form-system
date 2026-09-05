"use client";

import { createContext, useContext } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children, ...props }) => {
  return (
    <FormContext.Provider value={props}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

// نسخه‌ی اختیاری که وقتی کامپوننت خارج از <Form> است به‌جای throw، null برمی‌گرداند
// (برای اتصال دکمه‌های خارجی به فرم با attribute توسّط `form`)
export const useOptionalFormContext = () => {
  return useContext(FormContext);
};
