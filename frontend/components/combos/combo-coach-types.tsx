"use client";

import React, { useEffect, useState } from "react";
import useCoachTypes from "@/hooks/useCoachTypes";
import { Select } from "../ui/select";

type CoachTypeComboProps = {
  value?: string[] | string | number[] | number;
  onChange?: (value: string[]) => void;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  sport?: any | null;
  valueType?: "id" | "item";
  returnType?: "id" | "item";
};

export default function ComboCoachTypes({
  value,
  onChange,
  onValueChange,
  placeholder = "Select Coach Type",
  disabled = false,
  className,
  multiple = false,
  sport,
  valueType = "id",
  returnType = "id",
}: CoachTypeComboProps) {
  const { coachTypes, isLoading, error } = useCoachTypes(sport?.id);

  const handleChange = (v: string[] | null | undefined) => {
    onChange?.(v as string[]);
    onValueChange?.(v as string[]);
  };

  return (
    <Select
      data={coachTypes}
      value={value}
      onChange={(v) => handleChange(v as string[])}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      multiple={multiple}
      valueType={valueType}
      returnType={returnType}
      // multiple
      // allowClear
      // allowFilter
    />
  );
}
