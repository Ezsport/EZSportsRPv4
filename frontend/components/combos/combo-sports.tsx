"use client";

import React from "react";
import useSports from "@/hooks/useSports";
import { Select } from "@/components/ui/select";
import { components } from "@/types/api-types";

type SportComboProps = {
  valueType?: "id" | "item";
  returnType?: "id" | "item";
  value?:
    | string[]
    | string
    | number[]
    | number
    | components["schemas"]["BaseSportDto"][]
    | components["schemas"]["BaseSportDto"]
    | null;
  onChange?: (
    value: string[] | components["schemas"]["BaseSportDto"][] | null | undefined
  ) => void;
  onValueChange?: (
    value: components["schemas"]["BaseSportDto"][] | null | undefined
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
};

export default function ComboSports({
  valueType = "id",
  returnType = "id",
  value,
  onChange,
  onValueChange,
  placeholder = "Select Sport",
  disabled = false,
  className,
  multiple = false,
}: SportComboProps) {
  const { sports, loading, error } = useSports();

  const handleChange = (
    value: string[] | components["schemas"]["BaseSportDto"][] | null | undefined
  ) => {
    onChange?.(value);
    onValueChange?.(
      value as components["schemas"]["BaseSportDto"][] | null | undefined
    );
  };

  return (
    <Select
      data={sports}
      value={value as string[] | number[] | null | undefined}
      valueType={valueType}
      returnType={returnType}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled || loading}
      className={className}
      multiple={multiple}
      loading={loading}
      error={error}
    />
  );
}
