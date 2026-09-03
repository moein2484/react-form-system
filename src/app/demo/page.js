"use client";

import { useState } from "react";
import {
  Form,
  FormInput,
  FormNumber,
  FormEmail,
  FormPassword,
  FormCurrency,
  FormPercentage,
  FormDate,
  FormTime,
  FormSelect,
  FormSearchableSelect,
  FormCheckbox,
  FormRadio,
  FormSwitch,
  FormSubmit,
  FormActions,
} from "../../component/myForm";

// داده‌های دمو
const provinces = [
  { id: "tehran", name: "تهران" },
  { id: "esfahan", name: "اصفهان" },
  { id: "shiraz", name: "شیراز" },
  { id: "mashhad", name: "مشهد" },
];

const cities = [
  { id: "1", name: "تهران" },
  { id: "2", name: "کرج" },
  { id: "3", name: "قم" },
  { id: "4", name: "ساری" },
];

const genderOptions = [
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "test@example.com",
  password: "",
  age: 25,
  price: 1000000,
  percentage: 50,
  province: "",
  city: "",
  date: "",
  time: "08:00",
  terms: false,
  gender: "",
  notifications: true,
};

export default function DemoFormPage() {
  const [formType, setFormType] = useState("normal");
  const [validationMode, setValidationMode] = useState("onBlur");

  const handleSubmit = (data) => {
    console.log("FORM DATA:", data);
    alert("فرم با موفقیت ارسال شد! اطلاعات را در console بررسی کنید.");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px", direction: "rtl" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>دمو Form System</h1>

      <div style={{ marginBottom: "24px", padding: "16px", background: "#f5f5f5", borderRadius: "8px" }}>
        <h3>تنظیمات فرم:</h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
          <label>
            <input
              type="radio"
              checked={formType === "normal"}
              onChange={() => setFormType("normal")}
            />
            Normal
          </label>
          <label>
            <input
              type="radio"
              checked={formType === "strict"}
              onChange={() => setFormType("strict")}
            />
            Strict
          </label>
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: "8px" }}>
          <label>
            <input
              type="radio"
              checked={validationMode === "onBlur"}
              onChange={() => setValidationMode("onBlur")}
            />
            onBlur
          </label>
          <label>
            <input
              type="radio"
              checked={validationMode === "onChange"}
              onChange={() => setValidationMode("onChange")}
            />
            onChange
          </label>
          <label>
            <input
              type="radio"
              checked={validationMode === "onSubmit"}
              onChange={() => setValidationMode("onSubmit")}
            />
            onSubmit
          </label>
        </div>
      </div>

       <Form
         type={formType}
         validationMode={validationMode}
         onSubmit={handleSubmit}
         defaultValues={initialValues}
       >
         <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
           <FormInput
             name="firstName"
             label="نام"
             placeholder="نام خود را وارد کنید"
             required
             minLength={3}
             minLengthMessage="نام حداقل باید ۳ کاراکتر باشد"
           />

           <FormInput
             name="lastName"
             label="نام خانوادگی"
             placeholder="نام خانوادگی خود را وارد کنید"
             required
             minLength={3}
             minLengthMessage="نام خانوادگی حداقل باید ۳ کاراکتر باشد"
           />

           <FormEmail
             name="email"
             label="ایمیل"
             placeholder="example@test.com"
             required
             emailMessage="ایمیل معتبر نیست"
           />

           <FormPassword
             name="password"
             label="رمز عبور"
             placeholder="رمز عبور خود را وارد کنید"
             required
             minLength={6}
             minLengthMessage="رمز عبور حداقل باید ۶ کاراکتر باشد"
           />

           <FormNumber
             name="age"
             label="سن"
             placeholder="سن خود را وارد کنید"
             required
             min={18}
             minMessage="سن باید حداقل ۱۸ باشد"
           />

           <FormCurrency
             name="price"
             label="مبلغ (تومان)"
             placeholder="مبلغ را وارد کنید"
             required
             min={1000}
             minMessage="مبلغ باید حداقل ۱۰۰۰ باشد"
           />

           <FormPercentage
             name="percentage"
             label="درصد"
             placeholder="درصد را وارد کنید"
             required
             min={0}
             minMessage="درصد باید حداقل ۰ باشد"
             max={100}
             maxMessage="درصد باید حداکثر ۱۰۰ باشد"
           />

           <FormSelect
             name="province"
             label="استان"
             placeholder="استان را انتخاب کنید"
             required
             requiredMessage="استان الزامی است"
             options={provinces}
             valueKey="id"
             labelKey="name"
           />

           <FormSearchableSelect
             name="city"
             label="شهر"
             placeholder="شهر را انتخاب کنید"
             required
             requiredMessage="شهر الزامی است"
             options={cities}
             valueKey="id"
             labelKey="name"
           />

           <FormDate
             name="date"
             label="تاریخ شمسی"
             placeholder="تاریخ را انتخاب کنید"
             required
             requiredMessage="تاریخ الزامی است"
           />

           <FormTime
             name="time"
             label="ساعت"
             placeholder="ساعت را انتخاب کنید"
             required
             requiredMessage="ساعت الزامی است"
           />

           <FormRadio
             name="gender"
             label="جنسیت"
             required
             requiredMessage="جنسیت الزامی است"
             options={genderOptions}
           />

           <FormCheckbox
             name="terms"
             label="با شرایط و قوانین موافقم"
             required
             requiredMessage="پذیرش شرایط الزامی است"
           />

           <FormSwitch
             name="notifications"
             label="دریافت اعلانها"
           />
         </div>

        <FormActions submitText="ارسال فرم" resetText="بازنشانی" />
      </Form>
    </div>
  );
}
