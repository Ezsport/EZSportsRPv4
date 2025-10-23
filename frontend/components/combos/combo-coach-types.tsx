"use client";

import React, { useState } from "react";
import { useCoachTypes } from "@/hooks/useCoachTypes";
import { Select } from "../ui/select";

type CoachTypeComboProps = {
  value?: string[] | string | number[] | number;
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  sportId?: string | null;
};

export default function ComboCoachTypes({
  value,
  onChange,
  placeholder = "Select Coach Type",
  disabled = false,
  className,
  multiple = false,
  sportId,
}: CoachTypeComboProps) {
  const { coachTypes, isLoading, error } = useCoachTypes(sportId);
 
  return (
    <Select
      data={coachTypes}
      value={value}
      onChange={(v) => onChange?.(v as string[])}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      multiple={multiple} 
      // valueType="item"
      // returnType="item"
      // multiple
      // allowClear
      // allowFilter
    />
  );
}
