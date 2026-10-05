"use client";

import { useState } from "react";
import Link from "next/link";
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
  FormRadio,
  FormCheckbox,
  FormSwitch,
  FormTextarea,
  FormFileUpload,
  FormFileUploadMultiple,
  FormActions,
} from "@/component/myForm";
import demo from "./playground.module.css";

const choices = [
  { value: 0, label: "صفر" },
  { value: 1, label: "یک" },
];
const initial = {
  text: "",
  number: "",
  email: "",
  password: "",
  currency: "",
  percentage: "",
  date: "",
  time: "",
  select: "",
  multi: [],
  radio: "",
  checkbox: false,
  switch: false,
  textarea: "",
  file: null,
  files: [],
};
const controlStyle = {
  background: "#f5f3ff",
  borderColor: "#7c3aed",
  borderRadius: 16,
  color: "#4c1d95",
};
const customStyles = {
  input: controlStyle,
  inputInline: controlStyle,
  textarea: controlStyle,
  selectContainer: controlStyle,
  button: controlStyle,
  dropzone: controlStyle,
  inlineLabel: { background: "#ede9fe", color: "#6d28d9" },
  label: { color: "#6d28d9" },
  errorMessage: { color: "#be123c", background: "#fff1f2", padding: 8 },
  dropdown: { background: "#faf5ff", border: "2px solid #7c3aed" },
  optionItem: { color: "#6d28d9" },
  chip: { background: "#ede9fe", borderColor: "#7c3aed" },
  paper: { background: "#faf5ff", borderRadius: 8 },
  checkboxInput: { accentColor: "#7c3aed" },
  radioInput: { accentColor: "#7c3aed" },
  switchInput: { background: "#a78bfa" },
  fileItem: { background: "#f5f3ff" },
};

export default function Playground() {
  const [required, setRequired] = useState(true);
  const [strict, setStrict] = useState(false);
  const [custom, setCustom] = useState(false);
  const [failUpload, setFailUpload] = useState(false);
  const [result, setResult] = useState("");
  const shared = (label) => ({
    required,
    requiredMessage: `${label} را وارد کنید`,
    styles: custom ? customStyles : {},
    classNames: custom
      ? { label: demo.customLabel, calendar: demo.calendar }
      : {},
  });
  const upload = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (failUpload) throw new Error("Demo upload failure");
  };
  return (
    <main className={demo.page}>
      <Link href="/">همهٔ مثال‌ها</Link>
      <h1>آزمایش استایل و اعتبارسنجی فیلدها</h1>
      <p>
        الزامی بودن فقط با required تعیین می‌شود. در حالت اختیاری، فرم خالی را
        هم می‌توانید ارسال کنید. فایل‌ها در این مثال به سرور ارسال نمی‌شوند.
      </p>
      <div className={demo.settings}>
        <label>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />{" "}
          فیلدهای الزامی
        </label>
        <label>
          <input
            type="checkbox"
            checked={strict}
            onChange={(e) => setStrict(e.target.checked)}
          />{" "}
          حالت Strict
        </label>
        <label>
          <input
            type="checkbox"
            checked={custom}
            onChange={(e) => setCustom(e.target.checked)}
          />{" "}
          استایل سفارشی
        </label>
        <label>
          <input
            type="checkbox"
            checked={failUpload}
            onChange={(e) => setFailUpload(e.target.checked)}
          />{" "}
          شبیه‌سازی خطای آپلود
        </label>
      </div>
      <Form
        id="playground"
        type={strict ? "strict" : "normal"}
        defaultValues={initial}
        onSubmit={(data) =>
          setResult(
            JSON.stringify(
              data,
              (_, value) =>
                value instanceof File
                  ? { name: value.name, size: value.size }
                  : value,
              2,
            ),
          )
        }
      >
        <div className={demo.grid}>
          <FormInput
            name="text"
            label="متن"
            minLength={3}
            minLengthMessage="حداقل سه حرف"
            {...shared("متن")}
          />
          <FormNumber
            name="number"
            label="عدد"
            min={0}
            max={100}
            {...shared("عدد")}
          />
          <FormEmail name="email" label="ایمیل" {...shared("ایمیل")} />
          <FormPassword
            name="password"
            label="رمز آزمایشی"
            minLength={4}
            {...shared("رمز")}
          />
          <FormCurrency
            name="currency"
            labelShort="مبلغ"
            showPriceWords
            {...shared("مبلغ")}
          />
          <FormPercentage name="percentage" label="درصد" {...shared("درصد")} />
          <FormDate
            name="date"
            label="تاریخ"
            min="2020-01-01"
            max="2030-12-31"
            {...shared("تاریخ")}
          />
          <FormTime name="time" label="ساعت" {...shared("ساعت")} />
          <FormSelect
            name="select"
            label="انتخاب تکی"
            options={choices}
            searchable
            {...shared("انتخاب تکی")}
          />
          <FormSelect
            name="multi"
            label="انتخاب چندتایی"
            options={choices}
            multiple
            searchable
            {...shared("انتخاب چندتایی")}
          />
          <FormRadio
            name="radio"
            label="رادیو"
            options={choices}
            {...shared("رادیو")}
          />
          <FormCheckbox
            name="checkbox"
            label="تأیید آزمایشی"
            {...shared("تأیید")}
          />
          <FormSwitch name="switch" label="سوییچ" {...shared("سوییچ")} />
          <FormTextarea
            name="textarea"
            label="توضیحات"
            minLength={3}
            {...shared("توضیحات")}
          />
          <FormFileUpload
            name="file"
            label="فایل تکی"
            accept=".txt"
            maxSize={1024}
            onUpload={upload}
            {...shared("فایل تکی")}
          />
          <FormFileUploadMultiple
            name="files"
            label="چند فایل"
            accept=".txt"
            onUpload={upload}
            {...shared("چند فایل")}
          />
        </div>
        <FormActions submitText="ارسال داخلی" onReset={() => setResult("")} />
      </Form>
      <FormActions
        form="playground"
        submitText="ارسال خارجی"
        resetText="بازنشانی خارجی"
        onReset={() => setResult("")}
      />
      <pre className={demo.result} data-testid="result" aria-live="polite">
        {result || "هنوز ارسال نشده"}
      </pre>
      <h2>استایل کاملاً مستقل</h2>
      <Form
        onSubmit={(data) => setResult(JSON.stringify(data))}
        defaultValues={{ independent: "" }}
      >
        <FormInput
          name="independent"
          label="ورودی بدون استایل پیش‌فرض"
          unstyled
          classNames={{ input: demo.independentInput, label: demo.customLabel }}
          styles={{
            fieldContainer: { display: "grid", gap: 8 },
            errorMessage: { color: "crimson" },
          }}
          required
          requiredMessage="مقدار نمونهٔ مستقل را وارد کنید"
        />
        <FormActions submitText="ثبت نمونهٔ مستقل" showReset={false} />
      </Form>
    </main>
  );
}
