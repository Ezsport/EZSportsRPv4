"use client";

import React from "react";
import { useTeams } from "@/hooks/useTeams";
import { Select } from "../ui/select";
import { BaseItem } from "@/types/types";
import { components } from "@/types/api-types";

type TeamComboProps = {
  valueType?: "id" | "item";
  returnType?: "id" | "item";
  value?:
    | string[]
    | string
    | number[]
    | number
    | components["schemas"]["OrgTeamDto"][]
    | components["schemas"]["OrgTeamDto"]
    | null
    | undefined;
  onChange?: (
    value: string[] | components["schemas"]["OrgTeamDto"][] | null | undefined
  ) => void;
  onValueChange?: (
    value: components["schemas"]["OrgTeamDto"][] | null | undefined
  ) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  club?: components["schemas"]["OrgClubDto"] | null;
  sport?: components["schemas"]["BaseSportDto"] | null;
};

export default function ComboTeams({
  value,
  valueType = "id",
  returnType = "id",
  onChange,
  onValueChange,
  placeholder = "Select Team",
  disabled = false,
  className,
  multiple = false,
  club,
  sport,
}: TeamComboProps) {
  const { teams, isLoading, error } = useTeams(club?.id, sport?.id);

  const handleChange = (
    value: string[] | components["schemas"]["OrgTeamDto"][] | null | undefined
  ) => {
    onChange?.(value);
    onValueChange?.(value);
  };

  return (
    <Select
      data={teams}
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
