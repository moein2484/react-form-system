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
  FormCheckbox,
  FormRadio,
  FormSwitch,
  FormActions,
} from "../../../component/myForm";

const provinces = [
  { id: "tehran", name: "تهران" },
  { id: "esfahan", name: "اصفهان" },
  { id: "shiraz", name: "شیراز" },
  { id: "mashhad", name: "مشهد" },
];

const cityOptions = [
  { id: "1", name: "تهران" },
  { id: "2", name: "کرج" },
  { id: "3", name: "قم" },
  { id: "4", name: "ساری" },
];

const genderOptions = [
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
];

// کاربران با آواتار برای نمایش چند فیلد در هر گزینه سلکت
const users = [
  {
    id: "u1",
    name: "علی محمدی",
    email: "ali@test.com",
    avatar: "👨🏻‍💼",
    role: "مدیر",
  },
  {
    id: "u2",
    name: "سارا احمدی",
    email: "sara@test.com",
    avatar: "👩🏻‍💼",
    role: "کارشناس",
  },
  {
    id: "u3",
    name: "رضا کریمی",
    email: "reza@test.com",
    avatar: "👨🏻‍🔧",
    role: "فنی",
  },
  {
    id: "u4",
    name: "مریم حسینی",
    email: "maryam@test.com",
    avatar: "👩🏻‍🎨",
    role: "طراح",
  },
];

// پروژه‌های برای تست افزودن
const initialProjects = [
  { id: "p1", name: "پروژه آلفا" },
  { id: "p2", name: "پروژه بتا" },
];

function FormCard({ title, description, children }) {
  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "24px",
        background: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 4px 0", color: "#1976d2" }}>{title}</h3>
      <p style={{ margin: "0 0 16px 0", color: "#666", fontSize: "0.85rem" }}>
        {description}
      </p>
      {children}
    </div>
  );
}

function logSubmit(title) {
  return (data) => {
    console.log(`=== ${title} ===`);
    console.table(data);
    console.log("JSON:", JSON.stringify(data, null, 2));
  };
}

function UserOption({ user }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "1.3rem" }}>{user.avatar}</span>
      <div
        style={{ display: "flex", flexDirection: "column", lineHeight: 1.3 }}
      >
        <span style={{ fontWeight: 600 }}>{user.name}</span>
        <span style={{ fontSize: "0.72rem", color: "#888" }}>{user.email}</span>
      </div>
      <span
        style={{
          marginRight: "auto",
          marginLeft: "12px",
          fontSize: "0.7rem",
          background: "#e3f2fd",
          color: "#1976d2",
          borderRadius: "4px",
          padding: "2px 6px",
        }}
      >
        {user.role}
      </span>
    </div>
  );
}

export default function FormTypesDemoPage() {
  const [formType, setFormType] = useState("normal");
  const [projects, setProjects] = useState(initialProjects);
  const [newProjectName, setNewProjectName] = useState("");

  const handleAddProject = () => {
    const name = newProjectName.trim();
    if (!name) {
      alert("نام پروژه را وارد کنید");
      return;
    }
    setProjects((prev) => [...prev, { id: `p${Date.now()}`, name }]);
    setNewProjectName("");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "24px",
        direction: "rtl",
        fontFamily: "Tahoma, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "8px" }}>
        دمو فرم‌های تکی برای هر نوع اینپوت
      </h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "24px" }}>
        برای هر نوع فرم، دکمه submit را بزنید و نتیجه را در Console ببینید
      </p>

      {/* کنترل نوع فرم */}
      <div
        style={{
          marginBottom: "24px",
          padding: "16px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ margin: "0 0 8px 0" }}>تنظیمات سراسری فرم:</h3>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
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
      </div>

      {/* ########## FormSelect یکپارچه ########## */}
      <FormCard
        title="FormSelect (یکپارچه)"
        description="نسخه یکپارچه با پراپ searchable — بدون جستجو"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FormSelect")}
          defaultValues={{ province: "" }}
        >
          <FormSelect
            name="province"
            label="استان (بدون جستجو)"
            placeholder="استان را انتخاب کنید"
            required
            requiredMessage="استان الزامی است"
            options={provinces}
            valueKey="id"
            labelKey="name"
          />
          <FormActions submitText="ثبت FormSelect" />
        </Form>
      </FormCard>

      <FormCard
        title="FormSelect + جستجو"
        description="همان کامپوننت یکپارچه با searchable"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FormSelect Searchable")}
          defaultValues={{ city: "" }}
        >
          <FormSelect
            name="city"
            label="شهر (با جستجو)"
            placeholder="شهر را جستجو کنید"
            required
            requiredMessage="شهر الزامی است"
            searchable
            options={cityOptions}
            valueKey="id"
            labelKey="name"
          />
          <FormActions submitText="ثبت FormSelect جستجو" />
        </Form>
      </FormCard>

      <FormCard
        title="FormSelect + افزودن آیتم"
        description="با پراپ addItemLabel و onAddItem"
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            marginBottom: "12px",
            background: "#fafafa",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="نام پروژه جدید"
            style={{
              flex: 1,
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid #e0e0e0",
              fontSize: "0.8rem",
            }}
          />
          <button
            type="button"
            onClick={handleAddProject}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              background: "#1976d2",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            افزودن
          </button>
        </div>
        <Form
          type={formType}
          onSubmit={logSubmit("FormSelect Add")}
          defaultValues={{ project: "" }}
        >
          <FormSelect
            name="project"
            label="پروژه (با گزینه افزودن)"
            placeholder="پروژه را انتخاب کنید"
            required
            requiredMessage="پروژه الزامی است"
            searchable
            options={projects}
            valueKey="id"
            labelKey="name"
            addItemLabel="+ افزودن پروژه جدید"
            onAddItem={handleAddProject}
          />
          <FormActions submitText="ثبت FormSelect افزودن" />
        </Form>
      </FormCard>

      {/* ########## FormSelect با چند فیلد (آواتار) ########## */}
      <FormCard
        title="FormSelect با رندر چند فیلد (آواتار)"
        description="با renderContent هر گزینه آواتار + نام + ایمیل + نقش نمایش داده می‌شود"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FormSelect Avatar")}
          defaultValues={{ user: "" }}
        >
          <FormSelect
            name="user"
            label="انتخاب کاربر"
            placeholder="کاربر را انتخاب کنید"
            required
            requiredMessage="کاربر الزامی است"
            searchable
            options={users}
            valueKey="id"
            labelKey="name"
            renderContent={(user) => <UserOption user={user} />}
          />
          <FormActions submitText="ثبت FormSelect آواتار" />
        </Form>
      </FormCard>

      {/* ########## سایر انواع ورودی ########## */}
      <FormCard title="FormInput" description="ورودی متن ساده">
        <Form
          type={formType}
          onSubmit={logSubmit("FormInput")}
          defaultValues={{ name: "" }}
        >
          <FormInput
            name="name"
            label="نام کاربری"
            placeholder="نام را وارد کنید"
            required
            minLength={3}
            minLengthMessage="حداقل ۳ کاراکتر"
          />
          <FormActions submitText="ثبت FormInput" />
        </Form>
      </FormCard>

      <FormCard title="FormNumber" description="ورودی عددی با محدودیت">
        <Form
          type={formType}
          onSubmit={logSubmit("FormNumber")}
          defaultValues={{ age: 18 }}
        >
          <FormNumber
            name="age"
            label="سن"
            placeholder="سن را وارد کنید"
            required
            min={18}
            minMessage="سن باید حداقل ۱۸ باشد"
          />
          <FormActions submitText="ثبت FormNumber" />
        </Form>
      </FormCard>

      <FormCard title="FormEmail" description="ورودی ایمیل با اعتبارسنجی">
        <Form
          type={formType}
          onSubmit={logSubmit("FormEmail")}
          defaultValues={{ email: "" }}
        >
          <FormEmail
            name="email"
            label="ایمیل"
            placeholder="example@test.com"
            required
            emailMessage="ایمیل معتبر نیست"
          />
          <FormActions submitText="ثبت FormEmail" />
        </Form>
      </FormCard>

      <FormCard
        title="FormPassword"
        description="رمز عبور با قابلیت نمایش/مخفی"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FormPassword")}
          defaultValues={{ password: "" }}
        >
          <FormPassword
            name="password"
            label="رمز عبور"
            placeholder="رمز عبور را وارد کنید"
            required
            minLength={6}
            minLengthMessage="حداقل ۶ کاراکتر"
          />
          <FormActions submitText="ثبت FormPassword" />
        </Form>
      </FormCard>

      <FormCard title="FormCurrency" description="مبلغ با جداکننده هزارگان">
        <Form
          type={formType}
          onSubmit={logSubmit("FormCurrency")}
          defaultValues={{ price: 1000000 }}
        >
          <FormCurrency
            name="price"
            label="مبلغ (تومان)"
            placeholder="مبلغ را وارد کنید"
            required
            min={1000}
            minMessage="مبلغ حداقل ۱۰۰۰"
          />
          <FormActions submitText="ثبت FormCurrency" />
        </Form>
      </FormCard>

      <FormCard title="FormPercentage" description="درصد (۰ تا ۱۰۰)">
        <Form
          type={formType}
          onSubmit={logSubmit("FormPercentage")}
          defaultValues={{ percentage: 50 }}
        >
          <FormPercentage
            name="percentage"
            label="درصد"
            placeholder="درصد را وارد کنید"
            required
          />
          <FormActions submitText="ثبت FormPercentage" />
        </Form>
      </FormCard>

      <FormCard title="FormDate" description="تاریخ شمسی (ذخیره میلادی)">
        <Form
          type={formType}
          onSubmit={logSubmit("FormDate")}
          defaultValues={{ date: "" }}
        >
          <FormDate
            name="date"
            label="تاریخ شمسی"
            placeholder="تاریخ را انتخاب کنید"
            required
            requiredMessage="تاریخ الزامی است"
          />
          <FormActions submitText="ثبت FormDate" />
        </Form>
      </FormCard>

      <FormCard
        title="FormTime"
        description="انتخاب ساعت (پاپ‌آپ دنبال‌کننده اسکرول)"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FormTime")}
          defaultValues={{ time: "08:00" }}
        >
          <FormTime
            name="time"
            label="ساعت"
            placeholder="ساعت را انتخاب کنید"
            required
            requiredMessage="ساعت الزامی است"
          />
          <FormActions submitText="ثبت FormTime" />
        </Form>
      </FormCard>

      <FormCard title="FormRadio" description="انتخاب از بین گزینه‌ها">
        <Form
          type={formType}
          onSubmit={logSubmit("FormRadio")}
          defaultValues={{ gender: "" }}
        >
          <FormRadio
            name="gender"
            label="جنسیت"
            required
            requiredMessage="جنسیت الزامی است"
            options={genderOptions}
          />
          <FormActions submitText="ثبت FormRadio" />
        </Form>
      </FormCard>

      <FormCard title="FormCheckbox" description="تیک تایید (boolean)">
        <Form
          type={formType}
          onSubmit={logSubmit("FormCheckbox")}
          defaultValues={{ terms: false }}
        >
          <FormCheckbox
            name="terms"
            label="با شرایط و قوانین موافقم"
            required
            requiredMessage="پذیرش شرایط الزامی است"
          />
          <FormActions submitText="ثبت FormCheckbox" />
        </Form>
      </FormCard>

      <FormCard title="FormSwitch" description="سوییچ روشن/خاموش">
        <Form
          type={formType}
          onSubmit={logSubmit("FormSwitch")}
          defaultValues={{ notif: true }}
        >
          <FormSwitch name="notif" label="دریافت اعلان‌ها" />
          <FormActions submitText="ثبت FormSwitch" />
        </Form>
      </FormCard>

      {/* ########## تست اسکرول خودکار ########## */}
      <FormCard
        title="تست اسکرول خودکار به اولین خطا"
        description="چند فیلد الزامی خالی بگذارید و Submit بزنید — در حالت Normal باید به اولین فیلد خالی اسکرول کند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Auto Scroll")}
          defaultValues={{ f1: "", f2: "", f3: "", f4: "", f5: "", f6: "" }}
        >
          <FormInput
            name="f1"
            label="فیلد اول (الزامی)"
            placeholder="پر کنید"
            required
          />
          <FormInput
            name="f2"
            label="فیلد دوم (الزامی)"
            placeholder="پر کنید"
            required
          />
          <FormInput
            name="f3"
            label="فیلد سوم (الزامی)"
            placeholder="پر کنید"
            required
          />
          <FormInput
            name="f4"
            label="فیلد چهارم (الزامی)"
            placeholder="پر کنید"
            required
          />
          <FormInput
            name="f5"
            label="فیلد پنجم (الزامی)"
            placeholder="پر کنید"
            required
          />
          <FormInput
            name="f6"
            label="فیلد ششم (الزامی)"
            placeholder="پر کنید"
            required
          />
          <FormActions submitText="ثبت و اسکرول" />
        </Form>
      </FormCard>
    </div>
  );
}
