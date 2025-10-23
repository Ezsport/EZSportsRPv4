"use client";

import React, { useMemo } from "react";
import { usePlayerPositions } from "@/hooks/usePlayerPositions";
import { Select, BaseItem } from "../ui/select";

type PlayerPositionComboProps = {
  value?: string[] | string | null | undefined;
  onChange?: (value: string[] | null | undefined) => void;
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  sportId?: string;
};

export default function ComboPlayerPositions({
  value,
  onChange,
  onValueChange,
  placeholder = "Select Position",
  disabled = false,
  className,
  multiple = false,
  sportId,
}: PlayerPositionComboProps) {
  const { playerPositions, loading, error } = usePlayerPositions(
    sportId || undefined
  );
  console.log("playerPositions", playerPositions);
  // Memoize the formatted positions to prevent unnecessary re-renders
  const formattedPositions: BaseItem[] = useMemo(() => {
    console.log("Raw player positions:", playerPositions);

    // Ensure playerPositions is an array and has elements
    if (!Array.isArray(playerPositions) || playerPositions.length === 0) {
      console.warn("No player positions available");
      return [];
    }

    return playerPositions.map((pos) => ({
      id: pos.id?.toString() ?? "",
      name: pos.name,
      value: pos.id?.toString() ?? "",
    }));
  }, [playerPositions]);

  const handleChange = (value: string[] | BaseItem[] | null | undefined) => {
    if (value === null || value === undefined) {
      onChange?.(null);
      onValueChange?.([]);
      return;
    }

    const stringValues = Array.isArray(value)
      ? value.map((v) => (typeof v === "string" ? v : v.value))
      : value;

    onChange?.(stringValues);
    onValueChange?.(stringValues);
  };

  // Log any errors for debugging
  React.useEffect(() => {
    if (error) {
      console.error("Error in ComboPlayerPositions:", error);
    }
  }, [error]);

  return (
    <Select
      data={formattedPositions}
      value={value ?? undefined}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled || loading}
      className={className}
      multiple={multiple}
      loading={loading}
      error={error ?? undefined}
    />
  );
}
