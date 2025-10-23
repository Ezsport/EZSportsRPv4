"use client";

import React from "react";
import useClubs from "@/hooks/useClubs";
import { Select } from "../ui/select";
import { components } from "@/types/api-types";

type ClubComboProps = {
  valueType?: "id" | "item";
  returnType?: "id" | "item";
  value?: string[] | string | number[] | number | components["schemas"]["OrgClubDto"][] | components["schemas"]["OrgClubDto"] | null | undefined;
  onChange?: (value: string[] | components["schemas"]["OrgClubDto"][] | null | undefined) => void;
  onValueChange?: (value: components["schemas"]["OrgClubDto"][] | null | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
};

export default function ComboClubs({
  value,
  valueType = "id",
  returnType = "id",
  onChange,
  onValueChange,
  placeholder = "Select Club",
  disabled = false,
  className,
  multiple = false,
}: ClubComboProps) {
  const { clubs, isLoading, error } = useClubs();

  const handleChange = (value: string[] | components["schemas"]["OrgClubDto"][] | null | undefined) => {
    onChange?.(value);
    onValueChange?.(value);
  };

  return (
    <Select
      data={clubs}
      value={value === null || value === undefined ? [] : value}
      valueType={valueType}
      returnType={returnType}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled || isLoading}
      className={className}
      multiple={multiple}
      loading={isLoading}
      error={error || undefined}
    />
  );
}
