"use client";

import { useState } from "react";
import { z } from "zod";
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
  FormFileUpload,
  FormFileUploadMultiple,
  FormTextarea,
  FormActions,
  FormSubmit,
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
  { id: "8", name: "اهواز" },
  { id: "9", name: "بندر عباس" },
  { id: "10", name: "علی آباد" },
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
  {
    id: "u1",
    name: "علی محمدی",
    email: "ali@test.com",
    avatar: "👨‍💼",
    role: "مدیر",
  },
  {
    id: "u2",
    name: "سارا احمدی",
    email: "sara@test.com",
    avatar: "👩‍💼",
    role: "کارشناس",
  },
  {
    id: "u3",
    name: "رضا کریمی",
    email: "reza@test.com",
    avatar: "👨‍🔧",
    role: "فنی",
  },
  {
    id: "u4",
    name: "مریم حسینی",
    email: "maryam@test.com",
    avatar: "👩‍🎨",
    role: "طراح",
  },
];

const initialProjects = [
  { id: "p1", name: "پروژه آلفا" },
  { id: "p2", name: "پروژه بتا" },
];

const nationalCodeSchema = z.object({
  nationalCode: z.string().min(10, "کد ملی باید ۱۰ رقم باشد"),
  postalCode: z.string().min(10, "کد پستی باید ۱۰ رقم باشد"),
});

const priceWordsSchema = z.object({
  amount: z.string().min(4, "مبلغ باید حداقل ۴ رقم باشد"),
  amountLegacy: z.string().min(4, "مبلغ باید حداقل ۴ رقم باشد"),
});

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
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddProject = () => {
    const name = newProjectName.trim();
    if (!name) {
      alert("نام پروژه را وارد کنید");
      return;
    }
    setProjects((prev) => [...prev, { id: `p${Date.now()}`, name }]);
    setNewProjectName("");
  };

  const confirmAddFromModal = () => {
    const name = newProjectName.trim();
    if (!name) return;
    setProjects((prev) => [...prev, { id: `p${Date.now()}`, name }]);
    setNewProjectName("");
    setAddModalOpen(false);
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
      <FormCard
        title="۱) FormSelect (بدون جستجو)"
        description="با پراپ searchable={false}"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FormSelect")}
          defaultValues={{ province: "tehran" }}
        >
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
      <FormCard
        title="۲) FormSelect با جستجو"
        description="با پراپ searchable — دراپ‌داون هوشمند است: اگر پایین فضا نباشد بالا باز می‌شود و در مودال هم روی همه‌چیز می‌آید (portal) — عرض ش لیست با minDropdownWidth قابل کنترل است"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Searchable")}
          defaultValues={{ city: [] }}
        >
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
            minDropdownWidth={240}
          />
          <FormActions submitText="ثبت FormSelect جستجو" />
        </Form>
      </FormCard>

      {/* ====== FormSelect چند انتخابی ====== */}
      <FormCard
        title="۳) FormSelect چند انتخابی (multi)"
        description="با پراپ multiple — موارد انتخاب‌شده به‌صورت چیپ زیر اینپوت نمایش داده می‌شوند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("MultiSelect")}
          defaultValues={{ hobbies: ["sport", "book"] }}
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
      <FormCard
        title="۴) FormSelect با افزودن آیتم"
        description="با پراپ‌های addItemLabel و onAddItem"
      >
        <div className={styles.addRow}>
          <input
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="نام پروژه جدید"
            className={styles.addInput}
          />
          <button
            type="button"
            onClick={handleAddProject}
            className={styles.addBtn}
          >
            افزودن
          </button>
        </div>
        <Form
          type={formType}
          onSubmit={logSubmit("AddItem")}
          defaultValues={{ project: "p1" }}
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
        <Form
          type={formType}
          onSubmit={logSubmit("Avatar")}
          defaultValues={{ user: "u1" }}
        >
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
      <FormCard
        title="۶) FormInput"
        description="ورودی متن ساده با minLength و required"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Input")}
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

      <FormCard
        title="۷) FormNumber"
        description="ورودی عددی با محدودیت min/max"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Number")}
          defaultValues={{ age: 18 }}
        >
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
        <Form
          type={formType}
          onSubmit={logSubmit("Email")}
          defaultValues={{ email: "" }}
        >
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

      <FormCard
        title="۹) FormPassword"
        description="رمز عبور با دکمه نمایش/مخفی"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Password")}
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

      <FormCard
        title="۱۰) FormCurrency"
        description="مبلغ با جداکننده هزارگان — با showPriceWords مبلغ به حروف فارسی هم نوشته می‌شود"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Currency")}
          defaultValues={{ price: 1200000 }}
        >
          <FormCurrency
            name="price"
            label="مبلغ (تومان)"
            placeholder="مبلغ را وارد کنید"
            required
            min={1000}
            minMessage="مبلغ حداقل ۱۰۰۰"
            showPriceWords
          />
          <FormActions submitText="ثبت FormCurrency" />
        </Form>
      </FormCard>

      <FormCard title="۱۱) FormPercentage" description="درصد (۰ تا ۱۰۰)">
        <Form
          type={formType}
          onSubmit={logSubmit("Percentage")}
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
            // style={{border:"1px solid #eee"}}
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

      <FormCard
        title="۱۲) FormDate"
        description="تاریخ شمسی — ذخیره به‌صورت میلادی YYYY-MM-DD — با استایل استاندارد input (border، گردی گوشه، عرض ۱۰۰٪)"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Date")}
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
        title="۱۳) FormTime"
        description="انتخاب ساعت با پاپ‌آپ دنبال‌کننده اسکرول"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Time")}
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

      <FormCard title="۱۴) FormRadio" description="انتخاب از بین گزینه‌ها">
        <Form
          type={formType}
          onSubmit={logSubmit("Radio")}
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

      <FormCard title="۱۵) FormCheckbox" description="تیک تایید (boolean)">
        <Form
          type={formType}
          onSubmit={logSubmit("Checkbox")}
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

      <FormCard title="۱۶) FormSwitch" description="سوییچ روشن/خاموش">
        <Form
          type={formType}
          onSubmit={logSubmit("Switch")}
          defaultValues={{ notif: true }}
        >
          <FormSwitch name="notif" label="دریافت اعلان‌ها" />
          <FormActions submitText="ثبت FormSwitch" />
        </Form>
      </FormCard>

      {/* ====== آپلود فایل (تکی) ====== */}
      <FormCard
        title="۱۷) FormFileUpload (تکی)"
        description="درگ‌اند‌دراپ + لودینگ هنگام آپلود + ایکون نوع فایل (PDF/Word/عکس/...) — با prop روی onUpload"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FileUpload")}
          defaultValues={{ document: null }}
        >
          <FormFileUpload
            name="document"
            label="سند (فقط تا ۲ مگابایت)"
            required
            requiredMessage="انتخاب فایل الزامی است"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            acceptMessage="فقط فایل PDF یا مصور مجاز است"
            maxSize={2 * 1024 * 1024}
            maxSizeMessage="حجم فایل نباید بیشتر از ۲ مگابایت باشد"
            onUpload={() => new Promise((r) => setTimeout(r, 1500))}
          />
          <FormActions submitText="ثبت فایل" />
        </Form>
      </FormCard>

      {/* ====== آپلود چند فایل ====== */}
      <FormCard
        title="۱۸) FormFileUploadMultiple (چندتایی)"
        description="چند فایل هم‌زمان — لودینگ برای هریک + پیش‌نمایش تصویر + ایکون نوع فایل"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FileUploadMultiple")}
          defaultValues={{ images: [] }}
        >
          <FormFileUploadMultiple
            name="images"
            label="تصاویر (چند انتخابی)"
            accept="image/*"
            acceptMessage="فقط تصویر مجاز است"
            maxSize={5 * 1024 * 1024}
            maxSizeMessage="حجم هر تصویر نباید بیشتر از ۵ مگابایت باشد"
            onUpload={() => new Promise((r) => setTimeout(r, 1800))}
          />
          <FormActions submitText="ثبت تصاویر" />
        </Form>
      </FormCard>

      {/* ====== Textarea ====== */}
      <FormCard
        title="۱۹) FormTextarea (توضیحات)"
        description="متن چندخطی — ارتفاع با پراپ rows قابل تنظیم است و با drag از گوشه هم قابل تغییر است"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("Textarea")}
          defaultValues={{ description: "" }}
        >
          <FormTextarea
            name="description"
            label="توضیحات"
            placeholder="توضیحات خود را بنویسید..."
            rows={4}
            required
            requiredMessage="توضیحات الزامی است"
            minLength={10}
            minLengthMessage="توضیحات باید حداقل ۱۰ کاراکتر باشد"
          />
          <FormActions submitText="ثبت توضیحات" />
        </Form>
      </FormCard>

      {/* ====== Textarea با ارتفاع بیشتر ====== */}
      <FormCard
        title="۲۰) FormTextarea — ارتفاع زیاد (rows ببیشتر)"
        description="با rows={8} جعبه بلندتر می‌شود؛ کاربر هنوز هم می‌تواند ارتفاع را با drag تنظیم کند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("TextareaTall")}
          defaultValues={{ notes: "" }}
        >
          <FormTextarea
            name="notes"
            label="یادداشت‌ها"
            placeholder="یادداشت‌های بلند..."
            rows={8}
          />
          <FormActions submitText="ثبت یادداشت‌ها" />
        </Form>
      </FormCard>

      {/* ====== دکمه‌های سفارشی FormActions ====== */}
      <FormCard
        title="۲۱) استایل دکمه‌های FormActions — آبی"
        description="با submitClassName و resetClassName می‌توانید استایل دکمه‌ها را کاملاً عوض کنید"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("ActionsBlue")}
          defaultValues={{ name: "" }}
        >
          <FormInput name="name" label="نام" placeholder="نام را وارد کنید" />
          <FormActions
            submitText="ثبت آبی"
            submitClassName={styles.customSubmitBlue}
            resetClassName={styles.customResetOutlined}
          />
        </Form>
      </FormCard>

      <FormCard
        title="۲۲) استایل دکمه‌های FormActions — گرادیانت و گرد"
        description="با submitClassName=گرادیانت و resetClassName=دایره‌ای، دکمه‌ها ظاهر دلخواه می‌گیرند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("ActionsGradient")}
          defaultValues={{ email: "" }}
        >
          <FormInput
            name="email"
            label="ایمیل"
            placeholder="example@test.com"
          />
          <FormActions
            submitText="ثبت"
            submitClassName={styles.customSubmitGradient}
            showReset={false}
          />
        </Form>
      </FormCard>

      {/* ====== تست اسکرول خودکار ====== */}
      <FormCard
        title="۲۳) تست اسکرول خودکار به اولین خطا"
        description="چند فیلد الزامی خالی بگذارید و Submit بزنید — در حالت Normal باید به اولین فیلد خالی اسکرول کند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("AutoScroll")}
          defaultValues={{ f1: "", f2: "", f3: "", f4: "", f5: "" }}
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
          <FormActions submitText="ثبت و اسکرول" />
        </Form>
      </FormCard>

      {/* ====== کنترل دقیق ارتفاع Textarea ====== */}
      <FormCard
        title="۲۴) FormTextarea — کنترل دقیق ارتفاع"
        description="با height / minHeight / maxHeight / resize ارتفاع را دقیقاً کنترل کنید؛ resize={false} درگ از گوشه را هم غیرفعال می‌کند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("TextareaHeights")}
          defaultValues={{ fixed: "", stretch: "", locked: "" }}
        >
          <FormTextarea
            name="fixed"
            label="ارتفاع ثابت (height + resize {false})"
            placeholder="این باکس ارتفاع ثابت ۶۰px دارد و قابل تغییر نیست"
            height={60}
            resize={false}
            minLength={5}
            minLengthMessage="حداقل ۵ کاراکتر"
          />
          <FormTextarea
            name="stretch"
            label="کشسان با سقف (minHeight + maxHeight)"
            placeholder="بین ۹۰ تا ۱۶۰ پیکسل تغییر می‌کند"
            minHeight={90}
            maxHeight={160}
            resize="vertical"
          />
          <FormTextarea
            name="locked"
            label="بدون درگ (rows + resize {none})"
            placeholder="فقط با rows مشخص می‌شود — ارتفاع ۲ ردیف"
            rows={2}
            resize="none"
          />
          <FormActions submitText="ثبت متن‌ها" />
        </Form>
      </FormCard>

      {/* ====== سایزهای FormFileUpload ====== */}
      <FormCard
        title="۲۵) FormFileUpload — سایز sm / md / lg"
        description="با prop با نام size اندازه‌ی دراپ‌زون و آیکون تغییر می‌کند"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FileUploadSizes")}
          defaultValues={{ fSmall: null, fMedium: null, fLarge: null }}
        >
          <div className={styles.sizeRow}>
            <div>
              <span className={styles.sizeLabel}>size=&quot;sm&quot;</span>
              <FormFileUpload
                name="fSmall"
                size="sm"
                accept="image/*"
                onUpload={() => new Promise((r) => setTimeout(r, 1200))}
              />
            </div>
            <div>
              <span className={styles.sizeLabel}>
                size=&quot;md&quot; (پیش‌فرض)
              </span>
              <FormFileUpload
                name="fMedium"
                size="md"
                accept="image/*"
                onUpload={() => new Promise((r) => setTimeout(r, 1200))}
              />
            </div>
            <div>
              <span className={styles.sizeLabel}>size=&quot;lg&quot;</span>
              <FormFileUpload
                name="fLarge"
                size="lg"
                accept="image/*"
                onUpload={() => new Promise((r) => setTimeout(r, 1200))}
              />
            </div>
          </div>
          <FormActions submitText="ثبت فایل‌ها" />
        </Form>
      </FormCard>

      {/* ====== آواتار FormFileUpload ====== */}
      <FormCard
        title="۲۶) FormFileUpload — حالت آواتار (variant={avatar})"
        description="دراپ‌زون دایره‌ای که با انتخاب تصویر، آن را به‌جای آیکون نمایش می‌دهد — کلیک دوباره برای تعویض یا مقداردهی"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("FileAvatar")}
          defaultValues={{ avatar: null }}
        >
          <div className={styles.avatarWrap}>
            <FormFileUpload
              name="avatar"
              label="تصویر پروفایل"
              variant="avatar"
              size="md"
              accept="image/*"
              acceptMessage="فقط تصویر مجاز است"
              maxSize={2 * 1024 * 1024}
              maxSizeMessage="حداکثر ۲ مگابایت"
              onUpload={() => new Promise((r) => setTimeout(r, 1500))}
              required
              requiredMessage="انتخاب عکس پروفایل الزامی است"
            />
            <p className={styles.avatarNote}>
              یک تصویر انتخاب کنید تا در دایره نمایش داده شود. عکس فقط جنبه‌ی
              پیش‌نمایش دارد و مقدار نهایی فرم همان شیء File است — با onUpload
              لودینگ (حلقه) روی آواتار نمایش داده می‌شود.
            </p>
          </div>
          <FormActions submitText="ثبت پروفایل" />
        </Form>
      </FormCard>

      {/* ====== دکمه‌های خارج از فرم ====== */}
      <FormCard
        title="۲۷) دکمه‌های خارج از فرم — اتصال با id"
        description="با attribute توسّط `form` به دکمه‌ای بیرون از <Form> وصل شوید (ارسال طبق state فرم عمل می‌کند). دکمه‌ی خارجی وضعیت فرم را می‌فهمد: موقع ارسال «در حال ارسال...» و بعد از خطای اعتبارسنجی قرمز می‌شود"
      >
        <Form
          id="external-login"
          type={formType}
          onSubmit={logSubmit("ExternalSubmit")}
          defaultValues={{ extUser: "", extPass: "" }}
        >
          <FormInput
            name="extUser"
            label="نام کاربری"
            placeholder="خارج از فرم هم می‌توانید ثبت کنید"
            required
            requiredMessage="نام کاربری الزامی است"
          />
          <FormPassword
            name="extPass"
            label="رمز عبور"
            placeholder="رمز عبور"
            required
            minLength={3}
            minLengthMessage="حداقل ۳ کاراکتر"
          />
        </Form>
        <div className={styles.externalBar}>
          <span className={styles.externalLabel}>
            این دکمه‌ها بیرون از {"<Form>"} هستند و با
            form=&quot;external-login&quot; به آن وصل شده‌اند:
          </span>
          <FormActions
            form="external-login"
            showReset={false}
            submitText="ثبت (خارجی)"
          />
        </div>
        <FormSubmit
          form="external-login"
          className={styles.customSubmitGradient}
          style={{ marginTop: 12 }}
        >
          دکمه‌ی Submit جداگانه
        </FormSubmit>
      </FormCard>

      {/* ====== فایل CSS سراسری ====== */}
      <FormCard
        title="۲۸) فایل CSS سراسری مشترک myForm (globals.css)"
        description="با انتقال پوشه‌ی myForm، متغیرهای تم و فونت را یک‌بار import کنید تا کل پروژه یکپارچه شود"
      >
        <p className={styles.note}>
          <code>import &quot;component/myForm/globals.css&quot;</code> — این
          فایل متغیرهای <code>--form-*</code> و فونت پیش‌فرض را روی{" "}
          <code>:root</code> تعریف می‌کند. رنگ‌ها را در همان پروژه override کنید
          تا تم همه‌ی فرم‌ها عوض شود:
        </p>
        <div className={styles.themeGrid}>
          <div className={styles.themeItem}>
            <span className={styles.themeName}>--form-primary</span>
            <span className={styles.themeValue}>
              <span
                className={styles.swatch}
                style={{ ["--swatch"]: "var(--form-primary)" }}
              />
              آبی اصلی
            </span>
          </div>
          <div className={styles.themeItem}>
            <span className={styles.themeName}>--form-primary-light</span>
            <span className={styles.themeValue}>
              <span
                className={styles.swatch}
                style={{ ["--swatch"]: "var(--form-primary-light)" }}
              />
              روشن
            </span>
          </div>
          <div className={styles.themeItem}>
            <span className={styles.themeName}>--form-success</span>
            <span className={styles.themeValue}>
              <span
                className={styles.swatch}
                style={{ ["--swatch"]: "var(--form-success)" }}
              />
              موفقیت
            </span>
          </div>
          <div className={styles.themeItem}>
            <span className={styles.themeName}>--form-error</span>
            <span className={styles.themeValue}>
              <span
                className={styles.swatch}
                style={{ ["--swatch"]: "var(--form-error)" }}
              />
              خطا
            </span>
          </div>
          <div className={styles.themeItem}>
            <span className={styles.themeName}>--form-radius</span>
            <span className={styles.themeValue}>
              <span
                className={styles.swatch}
                style={{ ["--swatch"]: "#fff", background: "none" }}
              />
              10px
            </span>
          </div>
          <div className={styles.themeItem}>
            <span className={styles.themeName}>--form-border</span>
            <span className={styles.themeValue}>
              <span
                className={styles.swatch}
                style={{ ["--swatch"]: "var(--form-border)" }}
              />
              حاشیه
            </span>
          </div>
        </div>
      </FormCard>

      {/* ====== FormNumber خروجی رشته ====== */}
      <FormCard
        title="۲۹) FormNumber — خروجی رشته‌ای (asString)"
        description="برای فیلدهایی مثل کد ملی که در schema از نوع string هستند. بدون asString خروجی number است و با z.string() خطای «Expected string, received number» می‌دهد؛ با asString مقدار رشته می‌شود و با minLength چک می‌شود"
      >
        <Form
          schema={nationalCodeSchema}
          type={formType}
          onSubmit={logSubmit("AsString")}
          defaultValues={{ nationalCode: "", postalCode: "" }}
        >
          <FormNumber
            name="nationalCode"
            label="کد ملی"
            required
            requiredMessage="کد ملی الزامی است"
            placeholder="مثال: ۱۲۳۴۵۶۷۸۹۰"
            asString
            minLength={10}
            minLengthMessage="کد ملی باید ۱۰ رقم باشد"
          />
          <FormNumber
            name="postalCode"
            label="کد پستی"
            required
            requiredMessage="کد پستی الزامی است"
            placeholder="مثال: ۱۲۳۴۵۶۷۸۹۰"
            asString
            minLength={10}
            minLengthMessage="کد پستی باید ۱۰ رقم باشد"
          />
          <FormActions submitText="ثبت کدها" />
        </Form>
      </FormCard>

      {/* ====== سقف ارتفاع input و اسکرول داخلی ====== */}
      <FormCard
        title="۳۰) FormSelect — سقف ارتفاع input و اسکرول داخلی چیپ‌ها"
        description="با آیتم‌های زیاد، ارتفاع خود input تا سقف (حدود ۲ ردیف) می‌شود و بقیه داخل همان input اسکرول می‌خورد؛ ارتفاع فرم بیش از این کشیده نمی‌شود. حالت باریک (+ جستجو) هم در کادر ۲۲۰px تست شده"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("ChipScrollWide")}
          defaultValues={{ many: cityOptions.map((c) => c.id) }}
        >
          <FormSelect
            name="many"
            label="همه شهرها (چند انتخابی + جستجو، عرض معمولی)"
            placeholder="شهر انتخاب کنید"
            multiple
            searchable
            options={cityOptions}
            valueKey="id"
            labelKey="name"
          />
          <FormActions submitText="ثبت چیپ‌های زیاد" />
        </Form>
        <div className={styles.narrowWrap}>
          <Form
            type={formType}
            onSubmit={logSubmit("ChipScrollNarrow")}
            defaultValues={{ many: cityOptions.map((c) => c.id) }}
          >
            <FormSelect
              name="many"
              label="همه شهرها (چند انتخابی + جستجو، عرض باریک)"
              placeholder="شهر انتخاب کنید"
              multiple
              searchable
              options={cityOptions}
              valueKey="id"
              labelKey="name"
              minDropdownWidth={280}
            />
            <FormActions submitText="ثبت باریک" />
          </Form>
        </div>
      </FormCard>

      {/* ====== بستن لیست از داخل onAddItem ====== */}
      <FormCard
        title="۳۱) FormSelect — بستن لیست از داخل onAddItem"
        description="تابع مشترک «بستن لیست» به onAddItem پاس داده می‌شود: onAddItem={(close) => { close(); /* باز کردن مودال */ }} — با کلیک روی گزینه‌ی آخر (افزودن) لیست آیتم‌ها بسته می‌شود و مودال باز می‌شود"
      >
        <Form
          type={formType}
          onSubmit={logSubmit("AddItemModal")}
          defaultValues={{ project: "" }}
        >
          <FormSelect
            name="project"
            label="پروژه (با مودال افزودن)"
            placeholder="پروژه را انتخاب کنید"
            required
            requiredMessage="پروژه الزامی است"
            searchable
            options={projects}
            valueKey="id"
            labelKey="name"
            addItemLabel="افزودن پروژه جدید (با مودال)"
            onAddItem={(close) => {
              close();
              setAddModalOpen(true);
            }}
          />
          <FormActions submitText="ثبت پروژه" />
        </Form>

        {addModalOpen && (
          <div
            className={styles.modalOverlay}
            onClick={() => setAddModalOpen(false)}
          >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h4 className={styles.modalTitle}>افزودن پروژه جدید</h4>
              <input
                autoFocus
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="نام پروژه"
                className={styles.modalInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmAddFromModal();
                }}
              />
              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.modalCancel}
                  onClick={() => setAddModalOpen(false)}
                >
                  انصراف
                </button>
                <button
                  type="button"
                  className={styles.modalConfirm}
                  onClick={confirmAddFromModal}
                >
                  افزودن
                </button>
              </div>
            </div>
          </div>
        )}
      </FormCard>

      <FormCard
        title="۳۲) FormCurrency — خروجی رشته‌ای (asString)"
        description="بدون asString مقدار به صورت number ذخیره می‌شود و با schema ای که فیلد را z.string() تعریف کرده، خطای «Expected string, received number» می‌دهد. با asString مقدار string می‌شود (بدون جداکننده) و min/max و minLength درست کار می‌کنند — فیلد اول asString دارد، فیلد دوم همان مبلغ را بدون asString نشان می‌دهد"
      >
        <Form
          schema={priceWordsSchema}
          type={formType}
          onSubmit={logSubmit("CurrencyAsString")}
          defaultValues={{ amount: "", amountLegacy: "" }}
        >
          <FormCurrency
            name="amount"
            label="مبلغ (تومان) — asString"
            placeholder="مبلغ را وارد کنید"
            required
            min={1000}
            minMessage="مبلغ حداقل ۱۰۰۰"
            showPriceWords
            asString
          />
          <FormCurrency
            name="amountLegacy"
            label="مبلغ (تومان) — بدون asString"
            placeholder="مبلغ را وارد کنید"
            required
            showPriceWords
          />
          <FormActions submitText="ثبت مبالغ" />
        </Form>
      </FormCard>
    </div>
  );
}
