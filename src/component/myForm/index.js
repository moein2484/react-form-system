// Core
import Form from "./core/Form";
import { FormProvider, useFormContext, useOptionalFormContext } from "./core/FormProvider";
import "./globals.css";

// Fields
import FormInput from "./fields/FormInput";
import FormNumber from "./fields/FormNumber";
import FormEmail from "./fields/FormEmail";
import FormPassword from "./fields/FormPassword";
import FormCurrency from "./fields/FormCurrency";
import FormPercentage from "./fields/FormPercentage";
import FormDate from "./fields/FormDate";
import FormTime from "./fields/FormTime";
import FormSelect from "./fields/FormSelect";
import FormSearchableSelect from "./fields/FormSearchableSelect";
import FormCheckbox from "./fields/FormCheckbox";
import FormRadio from "./fields/FormRadio";
import FormSwitch from "./fields/FormSwitch";
import FormFileUpload from "./fields/FormFileUpload";
import FormFileUploadMultiple from "./fields/FormFileUploadMultiple";
import FormTextarea from "./fields/FormTextarea";

// Actions
import FormSubmit from "./actions/FormSubmit";
import FormActions from "./actions/FormActions";

// Existing components
import CurrencyInput from "./CurrencyInput";
import ShamsiDatePicker from "./ShamsiDatePicker";
import SearchableSelect from "./SearchableSelect";
import TimePicker from "./TimePicker/TimePicker";
import TimePickerTrigger from "./TimePicker/TimePickerTrigger";

export {
  // Core
  Form,
  FormProvider,
  useFormContext,
  useOptionalFormContext,

  // Fields
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
  FormFileUpload,
  FormFileUploadMultiple,
  FormTextarea,

  // Actions
  FormSubmit,
  FormActions,

  // Existing components
  CurrencyInput,
  ShamsiDatePicker,
  SearchableSelect,
  TimePicker,
  TimePickerTrigger,
};
