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
} from "../component/myForm";
import styles from "./FormDemos.module.css";

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
  { id: "5", name: "رشت" },
  { id: "6", name: "تبریز" },
  { id: "7", name: "اهواز" },
];

const hobbyOptions = [
  { id: "sport", name: "ورزش" },
  { id: "music", name: "موسیقی" },
  { id: "book", name: "کتابخوانی" },
  { id: "movie", name: "سینما" },
  { id: "travel", name: "سفر" },
  { id: "game", name: "بازی ویدیویی" },
];

const genderOptions = [
  { value: "male", label: "مرد" },
  { value: "female", label: "زن" },
];

const users = [
  { id: "u1", name: "علی محمدی", email: "ali@test.com", avatar: "👨‍💼", role: "مدیر" },
  { id: "u2", name: "سارا احمدی", email: "sara@test.com", avatar: "👩‍💼", role: "کارشناس" },
  { id: "u3", name: "رضا کریمی", email: "reza@test.com", avatar: "👨‍🔧", role: "فنی" },
  { id: "u4", name: "مریم حسینی", email: "maryam@test.com", avatar: "👩‍🎨", role: "طراح" },
];

const initialProjects = [
  { id: "p1", name: "پروژه آلفا" },
  { id: "p2", name: "پروژه بتا" },
];

function FormCard({ title, description, children }) {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDesc}>{description}</p>
      {children}
    </section>
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
    <div className={styles.userOption}>
      <span className={styles.userAvatar}>{user.avatar}</span>
      <div className={styles.userMeta}>
        <span className={styles.userName}>{user.name}</span>
        <span className={styles.userEmail}>{user.email}</span>
      </div>
      <span className={styles.userRole}>{user.role}</span>
    </div>
  );
}

export default function FormDemos() {
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
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>سیستم فرم اختصاصی (myForm)</h1>
        <p className={styles.subtitle}>
          دموی کامل تمام اینپوت‌ها — روی دکمه submit هر فرم بزنید و نتیجه را در
          Console ببینید
        </p>
      </header>

      {/* کنترل نوع فرم */}
      <div className={styles.settings}>
        <h3 className={styles.settingsTitle}>تنظیمات سراسری فرم:</h3>
        <div className={styles.settingsRow}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              checked={formType === "normal"}
              onChange={() => setFormType("normal")}
            />
            Normal
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              checked={formType === "strict"}
              onChange={() => setFormType("strict")}
            />
            Strict
          </label>
        </div>
      </div>

      {/* ====== FormSelect یکپارچه ====== */}
      <FormCard title="۱) FormSelect (بدون جستجو)" description='با پراپ searchable={false}'>
        <Form type={formType} onSubmit={logSubmit("FormSelect")} defaultValues={{ province: "" }}>
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
          <FormActions submitText="ثبت FormSelect" />
        </Form>
      </FormCard>

      {/* ====== FormSelect + جستجو ====== */}
      <FormCard title="۲) FormSelect با جستجو" description='با پراپ searchable'>
        <Form type={formType} onSubmit={logSubmit("Searchable")} defaultValues={{ city: "" }}>
          <FormSelect
            name="city"
            label="شهر"
            placeholder="شهر را جستجو و انتخاب کنید"
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

      {/* ====== FormSelect چند انتخابی ====== */}
      <FormCard
        title="۳) FormSelect چند انتخابی (multi)"
        description='با پراپ multiple — موارد انتخاب‌شده به‌صورت چیپ زیر اینپوت نمایش داده می‌شوند'
      >
        <Form
          type={formType}
          onSubmit={logSubmit("MultiSelect")}
          defaultValues={{ hobbies: [] }}
        >
          <FormSelect
            name="hobbies"
            label="علاقه‌مندی‌ها (چند انتخابی)"
            placeholder="علاقه‌مندی‌ها را انتخاب کنید"
            required
            requiredMessage="حداقل یک مورد انتخاب کنید"
            searchable
            multiple
            options={hobbyOptions}
            valueKey="id"
            labelKey="name"
          />
          <FormActions submitText="ثبت چند انتخاب" />
        </Form>
      </FormCard>

      {/* ====== FormSelect + افزودن آیتم ====== */}
      <FormCard title="۴) FormSelect با افزودن آیتم" description="با پراپ‌های addItemLabel و onAddItem">
        <div className={styles.addRow}>
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="نام پروژه جدید"
            className={styles.addInput}
          />
          <button type="button" onClick={handleAddProject} className={styles.addBtn}>
            افزودن
          </button>
        </div>
        <Form type={formType} onSubmit={logSubmit("AddItem")} defaultValues={{ project: "" }}>
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
            addItemLabel="افزودن پروژه جدید"
            onAddItem={handleAddProject}
          />
          <FormActions submitText="ثبت FormSelect افزودن" />
        </Form>
      </FormCard>

      {/* ====== FormSelect با رندر آواتار ====== */}
      <FormCard
        title="۵) FormSelect با رندر چند فیلد (آواتار)"
        description="با پراپ renderContent می‌توانید یک گزینه را با چند فیلد و استایل سفارشی نمایش دهید"
      >
        <Form type={formType} onSubmit={logSubmit("Avatar")} defaultValues={{ user: "" }}>
          <FormSelect
            name="user"
            labelShort="انتخاب کاربر"
            placeholder="کاربر را انتخاب کنید"
            required
            requiredMessage="کاربر الزامی است"
            searchable
            options={users}
            valueKey="id"
            labelKey="name"
            renderContent={(user) => <UserOption user={user} />}
          />
          <FormActions submitText="ثبت کاربر" />
        </Form>
      </FormCard>

      {/* ====== سایر ورودی‌ها ====== */}
      <FormCard title="۶) FormInput" description="ورودی متن ساده با minLength و required">
        <Form type={formType} onSubmit={logSubmit("Input")} defaultValues={{ name: "" }}>
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

      <FormCard title="۷) FormNumber" description="ورودی عددی با محدودیت min/max">
        <Form type={formType} onSubmit={logSubmit("Number")} defaultValues={{ age: 18 }}>
          <FormNumber
            name="age"
            labelShort="سن"
            placeholder="سن را وارد کنید"
            required
            min={18}
            minMessage="سن باید حداقل ۱۸ باشد"
          />
          <FormActions submitText="ثبت FormNumber" />
        </Form>
      </FormCard>

      <FormCard title="۸) FormEmail" description="اعتبارسنجی خودکار ایمیل">
        <Form type={formType} onSubmit={logSubmit("Email")} defaultValues={{ email: "" }}>
          <FormEmail
            name="email"
            labelShort="ایمیل"
            placeholder="example@test.com"
            required
            emailMessage="ایمیل معتبر نیست"
          />
          <FormActions submitText="ثبت FormEmail" />
        </Form>
      </FormCard>

      <FormCard title="۹) FormPassword" description="رمز عبور با دکمه نمایش/مخفی">
        <Form type={formType} onSubmit={logSubmit("Password")} defaultValues={{ password: "" }}>
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

      <FormCard title="۱۰) FormCurrency" description="مبلغ با جداکننده هزارگان">
        <Form type={formType} onSubmit={logSubmit("Currency")} defaultValues={{ price: 1000000 }}>
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

      <FormCard title="۱۱) FormPercentage" description="درصد (۰ تا ۱۰۰)">
        <Form type={formType} onSubmit={logSubmit("Percentage")} defaultValues={{ percentage: 50 }}>
          <FormPercentage name="percentage" label="درصد" placeholder="درصد را وارد کنید" required />
          <FormActions submitText="ثبت FormPercentage" />
        </Form>
      </FormCard>

      {/* ====== حالت لیبل short (لیبل داخل outline) ====== */}
      <FormCard
        title="۱۱) حالت لیبل short — labelShort"
        description="با پراپ labelShort، لیبلِ کوتاه به‌جای خطِ جدا، داخل outline اینپوت (سمت راست) قرار می‌گیرد"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("LabelShort")}
          defaultValues={{
            lsName: "",
            lsAge: 25,
            lsPrice: 500000,
            lsPercent: 30,
            lsDate: "",
            lsTime: "09:00",
            lsCity: "",
          }}
        >
          <FormInput
            name="lsName"
            labelShort="نام"
            placeholder="نام را وارد کنید"
            required
            requiredMessage="نام الزامی است"
          />
          <FormNumber
            name="lsAge"
            labelShort="سن"
            placeholder="سن را وارد کنید"
            required
            min={18}
            minMessage="سن باید حداقل ۱۸ باشد"
          />
          <FormCurrency
            name="lsPrice"
            labelShort="مبلغ"
            placeholder="مبلغ را وارد کنید"
            required
          />
          <FormPercentage
            name="lsPercent"
            labelShort="درصد"
            placeholder="درصد را وارد کنید"
            required
          />
          <FormDate
            name="lsDate"
            labelShort="تاریخ"
            placeholder="تاریخ را انتخاب کنید"
            required
            requiredMessage="تاریخ الزامی است"
          />
          <FormTime
            name="lsTime"
            labelShort="ساعت"
            required
            requiredMessage="ساعت الزامی است"
          />
          <FormSelect
            name="lsCity"
            labelShort="شهر"
            placeholder="شهر را انتخاب کنید"
            required
            requiredMessage="شهر الزامی است"
            searchable
            options={cityOptions}
            valueKey="id"
            labelKey="name"
          />
          <FormActions submitText="ثبت فرم با labelShort" />
        </Form>
      </FormCard>

      <FormCard title="۱۲) FormDate" description="تاریخ شمسی — ذخیره به‌صورت میلادی YYYY-MM-DD">
        <Form type={formType} onSubmit={logSubmit("Date")} defaultValues={{ date: "" }}>
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

      <FormCard title="۱۳) FormTime" description="انتخاب ساعت با پاپ‌آپ دنبال‌کننده اسکرول">
        <Form type={formType} onSubmit={logSubmit("Time")} defaultValues={{ time: "08:00" }}>
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

      <FormCard title="۱۴) FormRadio" description="انتخاب از بین گزینه‌ها">
        <Form type={formType} onSubmit={logSubmit("Radio")} defaultValues={{ gender: "" }}>
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

      <FormCard title="۱۵) FormCheckbox" description="تیک تایید (boolean)">
        <Form type={formType} onSubmit={logSubmit("Checkbox")} defaultValues={{ terms: false }}>
          <FormCheckbox
            name="terms"
            label="با شرایط و قوانین موافقم"
            required
            requiredMessage="پذیرش شرایط الزامی است"
          />
          <FormActions submitText="ثبت FormCheckbox" />
        </Form>
      </FormCard>

      <FormCard title="۱۶) FormSwitch" description="سوییچ روشن/خاموش">
        <Form type={formType} onSubmit={logSubmit("Switch")} defaultValues={{ notif: true }}>
          <FormSwitch name="notif" label="دریافت اعلان‌ها" />
          <FormActions submitText="ثبت FormSwitch" />
        </Form>
      </FormCard>

      {/* ====== تست اسکرول خودکار ====== */}
      <FormCard
        title="۱۷) تست اسکرول خودکار به اولین خطا"
        description="چند فیلد الزامی خالی بگذارید و Submit بزنید — در حالت Normal باید به اولین فیلد خالی اسکرول کند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("AutoScroll")}
          defaultValues={{ f1: "", f2: "", f3: "", f4: "", f5: "" }}
        >
          <FormInput name="f1" label="فیلد اول (الزامی)" placeholder="پر کنید" required />
          <FormInput name="f2" label="فیلد دوم (الزامی)" placeholder="پر کنید" required />
          <FormInput name="f3" label="فیلد سوم (الزامی)" placeholder="پر کنید" required />
          <FormInput name="f4" label="فیلد چهارم (الزامی)" placeholder="پر کنید" required />
          <FormInput name="f5" label="فیلد پنجم (الزامی)" placeholder="پر کنید" required />
          <FormActions submitText="ثبت و اسکرول" />
        </Form>
      </FormCard>
    </div>
  );
}