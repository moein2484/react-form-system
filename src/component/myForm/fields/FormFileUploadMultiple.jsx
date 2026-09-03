"use client";

import FormFileUpload from "./FormFileUpload";

// کامپوننت افزودن چند فایل — فقط FormFileUpload را با multiple فعال صدا می‌زند
export default function FormFileUploadMultiple(props) {
  return <FormFileUpload {...props} multiple />;
}