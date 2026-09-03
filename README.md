# سیستم فرم اختصاصی (myForm)

یک کتابخانه کامپوننت فرم فارسی/راست‌چین قابل استفاده مجدد، ساخته‌شده با **Next.js / React** و **react-hook-form** و **Zod**.

این سیستم شامل مجموعه‌ای از اینپوت‌های آماده است که می‌توانید برای ساخت فرم در هر پروژه‌ای از آن‌ها استفاده کنید. تمام فرم‌های مثال در صفحه اصلی (`/`) قرار دارند؛ با کلیک روی دکمه submit هر فرم، مقدار فیلدها در Console مرورگر لاگ می‌شود.

---

## فهرست مطالب

- [ویژگی‌ها](#ویژگی‌ها)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [استفاده سریع](#استفاده-سریع)
- [کامپوننت اصلی Form](#کامپوننت-اصلی-form)
- [لیست کامل اینپوت‌ها](#لیست-کامل-اینپوتها)
- [مرجع پراپ‌های مشترک](#مرجع-پراپهای-مشترک)
- [اینپوت‌ها به‌صورت تک‌تک](#اینپوتها-بهصورت-تکتک)
  - [FormInput](#1-forminput)
  - [FormNumber](#2-formnumber)
  - [FormEmail](#3-formemail)
  - [FormPassword](#4-formpassword)
  - [FormCurrency](#5-formcurrency)
  - [FormPercentage](#6-formpercentage)
  - [FormDate](#7-formdate)
  - [FormTime](#8-formtime)
  - [FormSelect (یکپارچه)](#9-formselect-یکپارچه)
  - [FormRadio](#10-formradio)
  - [FormCheckbox](#11-formcheckbox)
  - [FormSwitch](#12-formswitch)
- [دکمه‌ها و اکشن‌ها](#دکمهها-و-اکشنها)
- [استایل و شخصی‌سازی](#استایل-و-شخصیسازی)
- [فونت فارسی](#فونت-فارسی)
- [فرم‌های چند انتخابی](#فرمهای-چند-انتخابی)
- [پورت کردن به پروژه دیگر](#پورت-کردن-به-پروژه-دیگر)

---

## ویژگی‌ها

- ✅ تمام اینپوت‌ها راست‌چین و فارسی
- ✅ یکپارچه با **react-hook-form** (اعتبارسنجی در سطح فیلد)
- ✅ پشتیبانی از **Zod schema** برای اعتبارسنجی پیشرفته
- ✅ دو حالت فرم: **Normal** و **Strict**
- ✅ اسکرول خودکار به اولین فیلد خطادار (در حالت Normal)
- ✅ تاریخ شمسی با ذخیره میلادی
- ✅ پیکر ساعت با پاپ‌آپ دنبال‌کننده اسکرول
- ✅ سلکت یکپارچه با جستجو، افزودن آیتم، رندر سفارشی و **چند انتخابی**
- ✅ استایل‌های ماژولار و قابل انتقال (CSS Modules)
- ✅ فونت فارسی **DanaFaNum**

---

## نصب و راه‌اندازی

پیش‌نیازها:

- Node.js نسخه 18 یا بالاتر
- یک پروژه Next.js (نسخه 16 به بالا توصیه می‌شود)

```bash
# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev
```

سپس آدرس `http://localhost:3000` را در مرورگر باز کنید تا تمام دموها را ببینید. بک‌اند را باز کنید (F12) تا خروجی submit هر فرم را مشاهده کنید.

---

## استفاده سریع

```jsx
import {
  Form,
  FormInput,
  FormEmail,
  FormSelect,
  FormActions,
} from "@/component/myForm";

export default function Example() {
  return (
    <Form
      onSubmit={(data) => console.log(data)}
      defaultValues={{ name: "", email: "", city: "" }}
    >
      <FormInput
        name="name"
        label="نام"
        required
        minLength={3}
        minLengthMessage="نام حداقل ۳ کاراکتر"
      />
      <FormEmail name="email" label="ایمیل" required />
      <FormSelect
        name="city"
        label="شهر"
        searchable
        options={[
          { id: "1", name: "تهران" },
          { id: "2", name: "کرج" },
        ]}
        valueKey="id"
        labelKey="name"
      />
      <FormActions submitText="ارسال" />
    </Form>
  );
}
```

---

## کامپوننت اصلی Form

کامپوننت `<Form>` اتصال به react-hook-form را فراهم می‌کند و همه فیلدها را با **Context** تغذیه می‌کند.

| پراپ | نوع | پیش‌فرض | توضیح |
|------|-----|---------|-------|
| `onSubmit` | `(data) => void` | – | تابعی که بعد از ارسال موفق با مقادیر فرم صدا زده می‌شود |
| `defaultValues` | `object` | `{}` | مقادیر اولیه فیلدها |
| `schema` | `ZodSchema` | – | در صورت ارائه، اعتبارسنجی با Zod انجام می‌شود |
| `type` | `"normal" \| "strict"` | `"normal"` | `strict`: دکمه submit تا پر شدن کامل غیرفعال است |
| `validationMode` | `"onBlur" \| "onChange" \| "onSubmit"` | `"onBlur"` | زمان انجام اعتبارسنجی |
| `className` | `string` | – | کلاس سفارشی روی تگ `form` |

> **نکته اسکرول خودکار:** در حالت `normal`، بعد از submit اگر فرم دارای فیلد خالی/خطادار باشد، صفحه به‌صورت خودکار و نرم (smooth) به **اولین فیلد خطادار** اسکرول می‌شود و فوکوس روی آن قرار می‌گیرد.

---

## لیست کامل اینپوت‌ها

| # | کامپوننت | توضیح |
|---|----------|-------|
| 1 | `FormInput` | ورودی متن ساده |
| 2 | `FormNumber` | ورودی عددی |
| 3 | `FormEmail` | ایمیل با اعتبارسنجی خودکار |
| 4 | `FormPassword` | رمز با دکمه نمایش/مخفی |
| 5 | `FormCurrency` | مبلغ با جداکننده هزارگان |
| 6 | `FormPercentage` | درصد (۰ تا ۱۰۰) |
| 7 | `FormDate` | تاریخ شمسی (ذخیره میلادی) |
| 8 | `FormTime` | انتخاب ساعت |
| 9 | `FormSelect` | سلکت یکپارچه (جستجو/افزودن/چند انتخابی/رندر سفارشی) |
| 10 | `FormRadio` | گزینه‌های رادیویی |
| 11 | `FormCheckbox` | باکس تایید (boolean) |
| 12 | `FormSwitch` | سوییچ (boolean) |
| 13 | `FormFileUpload` | آپلود فایل تکی (درگ‌اند‌دراپ) |
| 14 | `FormFileUploadMultiple` | آپلود چند فایل هم‌زمان (درگ‌اند‌دراپ) |

---

## مرجع پراپ‌های مشترک

بیشتر اینپوت‌ها این پراپ‌ها را دارند:

| پراپ | نوع | توضیح |
|------|-----|-------|
| `name` | `string` (الزامی) | نام فیلد در فرم |
| `label` | `string` | عنوان نمایشی |
| `labelShort` | `string` | عنوانِ کوتاه که به‌جای یک خطِ مجزا، داخل outline اینپوت (سمت راست) قرار می‌گیرد — حالت «inline». وقتی تنظیم شود، `label` نادیده گرفته می‌شود |
| `placeholder` | `string` | متن راهنمای داخل اینپوت |
| `required` | `boolean` | الزامی بودن فیلد |
| `requiredMessage` | `string` | پیام خطای الزامی بودن |
| `validate` | `(value) => true \| string` | تابع اعتبارسنجی سفارشی |
| `disabled` | `boolean` | غیرفعال بودن |
| `className` | `string` | کلاس سفارشی |

### حالت لیبل short (`labelShort`)

همه اینپوت‌های مبتنی بر جعبه‌نوشتند (text/number/email/password/currency/percentage/date/time/select) از پراپ `labelShort` پشتیبانی می‌کنند. در این حالت، عنوانِ کوتاه به‌جای خطِ جداگانه، به‌صورت یک برچسبِ inline در سمت راستِ داخل	outline اینپوت نمایش داده می‌شود (با پس‌زمینه‌ی آبیِ کمرنگ). اگر `labelShort` را تنظیم نکنید یا نادیده بگیرید (`undefined`)، همان رفتار قبلی (لیبلِ خط‌به‌خط) برقرار است.

```jsx
<FormInput
  name="name"
  label="اسم کامل"     // نادیده گرفته می‌شود وقتی labelShort داده می‌شود
  labelShort="نام"
  placeholder="نام را وارد کنید"
  required
/>
<FormSelect
  name="city"
  labelShort="شهر"
  searchable
  options={cities}
  valueKey="id"
  labelKey="name"
/>
```

فقط `FormRadio`، `FormCheckbox` و `FormSwitch` به‌صورت block باقی مانده‌اند و هنوز از `labelShort` پشتیبانی نمی‌کنند (در این کامپوننت‌ها از `label` استفاده کنید).

همه فیلدها از `react-hook-form` استفاده می‌کنند و باید داخل `<Form>` باشند در غیر این صورت خطا می‌دهند.

---

## اینپوت‌ها به‌صورت تک‌تک

### 1) FormInput

ورودی متن ساده.

**پراپ‌های اختصاصی:**

| پراپ | نوع | توضیح |
|------|-----|-------|
| `type` | `string` | نوع input استاندارد HTML (پیش‌فرض `text`) |
| `minLength` | `number` | حداقل تعداد کاراکتر |
| `minLengthMessage` | `string` | پیام خطای minLength |
| `maxLength` | `number` | حداکثر تعداد کاراکتر |
| `maxLengthMessage` | `string` | پیام خطای maxLength |
| `pattern` | `RegExp \| string` | الگوی regex |
| `patternMessage` | `string` | پیام خطای pattern |
| `readOnly` | `boolean` | فقط‌خواندنی |

### 2) FormNumber

ورودی عددی با اعتبارسنجی عددی.

| پراپ | نوع | توضیح |
|------|-----|-------|
| `min` | `number` | حداقل مقدار |
| `minMessage` | `string` | پیام خطا |
| `max` | `number` | حداکثر مقدار |
| `maxMessage` | `string` | پیام خطا |
| `step` | `number` | گام افزایش |
| `readOnly` | `boolean` | فقط‌خواندنی |

### 3) FormEmail

ایمیل با الگوی اعتبارسنجی از پیش تعریف‌شده.

| پراپ | نوع | توضیح |
|------|-----|-------|
| `emailMessage` | `string` | پیام خطای ایمیل نامعتبر |
| `readOnly` | `boolean` | فقط‌خواندنی |

### 4) FormPassword

رمز عبور با دکمه نمایش (👁️) / مخفی (🔒).

| پراپ | نوع | توضیح |
|------|-----|-------|
| `minLength` / `maxLength` | `number` | محدودیت طول |
| `minLengthMessage` / `maxLengthMessage` | `string` | پیام خطا |
| `showToggle` | `boolean` (پیش‌فرض `true`) | نمایش دکمه چشم |
| `readOnly` | `boolean` | فقط‌خواندنی |

### 5) FormCurrency

ورودی مبلغ با کاماگذاری هزارگان (نمایش LTR). مقدار ذخیره‌شده عدد است.

| پراپ | نوع | توضیح |
|------|-----|-------|
| `min` / `minMessage` | `number` / `string` | حداقل مبلغ |
| `max` / `maxMessage` | `number` / `string` | حداکثر مبلغ |

### 6) FormPercentage

ورودی درصد با نماد ٪. پیش‌فرض `min=0`، `max=100`، `step=0.01`.

### 7) FormDate

تقویم **شمسی (Jalali)**. کاربر تاریخ را شمسی انتخاب می‌کند اما مقدار ذخیره‌شده در فرم **میلادی** به فرمت `YYYY-MM-DD` است (برای ذخیره در دیتابیس).

| پراپ | نوع | توضیح |
|------|-----|-------|
| `min` / `minMessage` | `string` (میلادی `YYYY-MM-DD`) / `string` | حداقل تاریخ |
| `max` / `maxMessage` | `string` / `string` | حداکثر تاریخ |

**مثال:** انتخاب تاریخ شمسی `۱۴۰۳/۰۷/۲۲` → ذخیره می‌شود `2024-10-13`.

### 8) FormTime

انتخاب ساعت با یک پیکر بازشودنی (دست‌ساز) شامل دو ستون ساعت و دقیقه. مقدار رشته `HH:mm` است (مثلا `"08:00"`).

| پراپ | نوع | توضیح |
|------|-----|-------|
| `type` | `string` | در صورت `"meeting"` دکمه تمام‌عرض می‌شود |

> پاپ‌آپ ساعت موقعیت خود را هنگام **اسکرول صفحه و تغییر سایز** به‌روزرسانی می‌کند و از لبه صفحه خارج نمی‌شود.

### 9) FormSelect (یکپارچه)

سلکت یکپارچه و قدرتمند — جایگزین هر دو `FormSelect` و `FormSearchableSelect` قبلی.

| پراپ | نوع | پیش‌فرض | توضیح |
|------|-----|---------|-------|
| `options` | `array` | `[]` | لیست گزینه‌ها |
| `valueKey` | `string` | `"value"` | کلید مقدار هر گزینه |
| `labelKey` | `string` | `"label"` | کلید متن نمایشی |
| `searchable` | `boolean` | `false` | نمایش باکس جستجو |
| `multiple` | `boolean` | `false` | فعال کردن **چند انتخابی** |
| `loading` | `boolean` | `false` | حالت بارگذاری |
| `loadingText` | `string` | `"در حال بارگذاری..."` | متن حالت بارگذاری |
| `renderContent` | `(option) => ReactNode` | – | رندر سفارشی هر گزینه (مثلا آواتار + نام + نقش) |
| `renderSelected` | `(option) => ReactNode` | – | رندر سفارشی مقدار انتخاب‌شده |
| `renderChip` | `(option) => ReactNode` | – | رندر سفارشی هر چیپ در چند انتخابی |
| `addItemLabel` | `string` | – | متن دکمه «افزودن» در پایین لیست |
| `onAddItem` | `() => void` | – | تابع کلیک دکمه افزودن |

**مثال چند انتخابی (چیپ‌ها زیر اینپوت):**

```jsx
<FormSelect
  name="hobbies"
  label="علاقه‌مندی‌ها"
  searchable
  multiple
  required
  requiredMessage="حداقل یک مورد انتخاب کنید"
  options={hobbyOptions}
  valueKey="id"
  labelKey="name"
/>
```

در حالت `multiple`، آیتم‌های انتخاب‌شده به‌صورت چیپ‌های قابل حذف داخل (و در صورت نیاز ادامه آنها) نمایش داده می‌شوند. مقدار فیلد یک **آرایه** است (مثلا `["sport", "music"]`).

**مثال رندر سفارشی (آواتار):**

```jsx
<FormSelect
  name="user"
  options={users}
  valueKey="id"
  labelKey="name"
  searchable
  renderContent={(user) => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <span>{user.avatar}</span>
      <span>{user.name}</span>
      <em>{user.email}</em>
    </div>
  )}
/>
```

### 10) FormRadio

گزینه‌های رادیویی.

| پراپ | نوع | پیش‌فرض | توضیح |
|------|-----|---------|-------|
| `options` | `array` | `[]` | لیست گزینه‌ها |
| `valueKey` | `string` | `"value"` | کلید مقدار |
| `labelKey` | `string` | `"label"` | کلید متن |

### 11) FormCheckbox

تیک تایید — مقدار فیلد `boolean` است.

### 12) FormSwitch

سوییچ روشن/خاموش — مقدار فیلد `boolean` است.

### 13) FormFileUpload (آپلود فایل تکی)

باکس درگ‌اند‌دراپ برای افزودن **یک** فایل. مقدار فیلد یک شیء `File` است.

| پراپ | نوع | پیش‌فرض | توضیح |
|------|-----|---------|-------|
| `required` | `boolean` | `false` | الزامی بودن انتخاب فایل |
| `requiredMessage` | `string` | `"این فیلد الزامی است"` | پیام خطای الزامی بودن |
| `accept` | `string` | – | پسوند/نوع مجاز (مثل `".pdf,.png"` یا `"image/*"`) |
| `acceptMessage` | `string` | `"نوع فایل مجاز نیست"` | پیام خطای نوع فایل |
| `maxSize` | `number` | – | حداکثر حجم فایل (بایت) |
| `maxSizeMessage` | `string` | – | پیام خطای حداکثر حجم |
| `minSize` | `number` | – | حداقل حجم فایل (بایت) |
| `minSizeMessage` | `string` | – | پیام خطای حداقل حجم |
| `disabled` | `boolean` | `false` | غیرفعال کردن باکس |
| `dragText`/`dragHint`/`browseText` | `string` | – | متن‌های سفارشی باکس |
| `renderItem` | `(file, index) => ReactNode` | – | رندر سفارشی هر فایل در لیست |

```jsx
<FormFileUpload
  name="document"
  label="سند"
  required
  requiredMessage="انتخاب فایل الزامی است"
  accept=".pdf,.jpg,.png"
  acceptMessage="فقط فایل PDF یا تصویر مجاز است"
  maxSize={2 * 1024 * 1024}
  maxSizeMessage="حجم فایل حداکثر ۲ مگابایت"
/>
```

### 14) FormFileUploadMultiple (آپلود چند فایل)

مانند `FormFileUpload` ولی `multiple` فعال است و چند فایل هم‌زمان پذیرفته می‌شود. مقدار فیلد یک **آرایه‌ی `File`** است و برای تصاویر پیش‌نمایش و دکمه حذف هر آیتم نمایش داده می‌شود.

```jsx
<FormFileUploadMultiple
  name="images"
  label="تصاویر"
  accept="image/*"
  acceptMessage="فقط تصویر مجاز است"
  maxSize={5 * 1024 * 1024}
  maxSizeMessage="حجم هر تصویر حداکثر ۵ مگابایت"
/>
```

> نکته: هر دو کامپوننت مقدار `File`/`File[]` واقعی را ذخیره می‌کنند. برای ارسال به سرور، `File` را مستقیم در `FormData` قرار دهید یا قبل از submit به Base64 تبدیل کنید.

---

## دکمه‌ها و اکشن‌ها

### FormActions

| پراپ | نوع | پیش‌فرض | توضیح |
|------|-----|---------|-------|
| `submitText` | `string` | `"ارسال"` | متن دکمه submit |
| `resetText` | `string` | `"بازنشانی"` | متن دکمه بازنشانی |
| `showReset` | `boolean` | `true` | نمایش دکمه بازنشانی |
| `onReset` | `() => void` | – | تابع بعد از بازنشانی |
| `children` | `ReactNode` | – | اگر ارسال شود، به‌جای دکمه‌های پیش‌فرض رندر می‌شود |

### FormSubmit

دکمه submit مستقل. اگر به‌تنهایی استفاده نشود، مقدار `children` به‌صورت متن دکمه رندر می‌شود.

---

## استایل و شخصی‌سازی

استایل‌ها با **CSS Modules** نوشته شده‌اند و خودفزایشی (self-contained) هستند؛ یعنی با انتقال پوشه `myForm`، استایل‌ها همراه آن اعمال می‌شوند.

**متغیرهای CSS سراسری** (تعریف‌شده در `:root`):

| متغیر | مقدار پیش‌فرض | کاربرد |
|-------|---------------|--------|
| `--font-fa` | `"DanaFaNum", Tahoma, sans-serif` | فونت سراسری |
| `--form-primary` | `#1976d2` | رنگ اصلی (آبی) |
| `--form-primary-light` | `#e3f2fd` | پس‌زمینه روشن انتخابی |
| `--form-primary-hover` | `#115293` | هوور رنگ اصلی |
| `--form-success` | `#4caf50` | رنگ موفقیت (دکمه submit) |
| `--form-success-hover` | `#388e3c` | هوور سبز |
| `--form-error` | `#d32f2f` | رنگ خطا |
| `--form-border` | `#e0e0e0` | رنگ حاشیه اینپوت |
| `--form-border-hover` | `#b0bec5` | هوور حاشیه |
| `--form-disabled-bg` | `#f5f5f5` | پس‌زمینه غیرفعال |
| `--form-text` | `#333` | رنگ متن |
| `--form-placeholder` | `#9e9e9e` | رنگ placeholder |
| `--form-radius` | `10px` | گوشه‌های گرد |

برای تغییر ظاهر کل سیستم کافی است این متغیرها را در `globals.css` پروژه‌ی خود (یا در یک فایل CSS ایمپورت‌شده) بازنویسی کنید:

```css
:root {
  --form-primary: #9c27b0;
  --form-radius: 6px;
}
```

---

## فونت فارسی

فونت **DanaFaNum** در `public/fonts/` قرار دارد و از طریق `globals.css` با `@font-face` بارگذاری می‌شود. وزن‌های موجود:

- Thin (100), UltraLight (200), Light (300), Regular (400), Medium (500), DemiBold (600), Bold (700), ExtraBold (800), Black (900)

اگر فونت دیگری (مثل YekanBakh یا Peyda) خواستید، کافی است تعریف `@font-face` در `globals.css` را تغییر دهید و مسیر فایل‌ها را آپدیت کنید.

---

## فرم‌های چند انتخابی

سلکت چند انتخابی (`multiple`) در لاگ submit به‌صورت **آرایه** برگردانده می‌شود:

```js
// خروجی onSubmit
{
  hobbies: ["sport", "music"], // آرایه
}
```

چیپ‌های انتخاب‌شده داخل اینپوت نمایش داده می‌شوند و هر چیپ دکمه حذف (x) دارد.

---

## پورت کردن به پروژه دیگر

1. پوشه `src/component/myForm` را کامل کپی کنید.
2. از فایل `myForm/index.js` ایمپورت کنید:

```js
import {
  Form,
  FormInput,
  FormSelect,
  FormActions,
  // ...
} from "./myForm";
```

3. مطمئن شوید وابستگی‌های زیر نصب هستند:
   - `react-hook-form`
   - `@hookform/resolvers`
   - `zod` (در صورت استفاده از schema)
   - `react-multi-date-picker`
   - `react-date-object`
   - `dayjs`
   - `framer-motion`

4. تعریف `@font-face` فونت DanaFaNum (در بخش فونت بالا) و متغیرهای CSS را به پروژه خود اضافه کنید.

---

## اجرای نمونه‌ها

```bash
npm run dev
```

صفحه اصلی (`/`) شامل ۱۷ کارت دموی مختلف است:

1. FormSelect (بدون جستجو)
2. FormSelect با جستجو
3. FormSelect چند انتخابی
4. FormSelect با افزودن آیتم
5. FormSelect با رندر آواتار
6. FormInput
7. FormNumber
8. FormEmail
9. FormPassword
10. FormCurrency
11. FormPercentage
12. FormDate
13. FormTime
14. FormRadio
15. FormCheckbox
16. FormSwitch
17. تست اسکرول خودکار به اولین خطا

هر کارت یک فرم مستقل با دکمه submit دارد. خروجی در Console مرورگر لاگ می‌شود.

---

## مجوز

This project is MIT licensed.