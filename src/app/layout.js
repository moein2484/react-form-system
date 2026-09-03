import "./globals.css";

export const metadata = {
  title: "سیستم فرم اختصاصی",
  description: "کامپوننت‌های فرم قابل استفاده مجدد برای پروژه‌های مختلف",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}