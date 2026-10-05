"use client";

import { Controller } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useFormContext } from "./FormProvider";
import { fieldRules } from "./validation";

export default function FieldController({ required, requiredMessage, boolean, rules, ...props }) {
  const { trigger } = useFormContext();
  const previousRequired = useRef(required);
  const name = props.name;
  useEffect(() => {
    if (previousRequired.current !== required) {
      previousRequired.current = required;
      void trigger(name);
    }
  }, [required, trigger, name]);
  return <Controller defaultValue={boolean ? false : ""} {...props}
    rules={fieldRules({ required, requiredMessage, boolean, rules })} />;
}
