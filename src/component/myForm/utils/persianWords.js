// تبدیل عدد به حروف فارسی — برای نمایش مبلغ به‌صورت خوانا
// مثال: 1200000 => یک میلیون و دویست هزار

const ONES = [
  "",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];

const TENS = [
  "",
  "ده",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];

const HUNDREDS = [
  "",
  "صد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];

const THREE_DIGIT_GROUPS = [
  "",
  "هزار",
  "میلیون",
  "میلیارد",
  "بیلیون",
  "بیلیارد",
  "تریلیون",
];

const conjunction = " و ";

function threeDigitsToWords(num) {
  const parts = [];
  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundreds) parts.push(HUNDREDS[hundreds]);

  if (remainder) {
    if (remainder < 20) {
      parts.push(ONES[remainder]);
    } else {
      const tens = Math.floor(remainder / 10);
      const ones = remainder % 10;
      parts.push(ones ? TENS[tens] + conjunction + ONES[ones] : TENS[tens]);
    }
  }

  return parts.join(conjunction);
}

export function numberToPersianWords(num) {
  if (num === null || num === undefined || num === "") return "";
  if (typeof num === "string" && num.trim() === "") return "";

  const value = typeof num === "string" ? Number(num.replace(/,/g, "")) : Number(num);

  if (isNaN(value)) return "";

  if (value === 0) return "صفر";

  const negative = value < 0;
  let n = Math.abs(Math.trunc(value));
  if (n === 0) return "صفر";

  const groups = [];
  while (n > 0) {
    groups.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  const groupWords = groups
    .map((group, i) => {
      if (group === 0) return "";
      const digitsWords = threeDigitsToWords(group);
      return digitsWords && THREE_DIGIT_GROUPS[i]
        ? digitsWords + " " + THREE_DIGIT_GROUPS[i]
        : digitsWords;
    })
    .filter(Boolean)
    .reverse()
    .join(conjunction);

  return negative ? "منفی " + groupWords : groupWords;
}