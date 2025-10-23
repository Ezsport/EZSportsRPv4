"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSports } from "@/hooks/useSports";
import { TypeSport } from "@/lib/types";

type SportCheckerProps = {
  value?: string[] | string | number[] | number;
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  className?: string;
  defaultChecked?: string[] | string | number[] | number;
};

export function CheckerSports({
  value,
  onChange,
  disabled = false,
  className,
  defaultChecked,
}: SportCheckerProps) {
  const { sports, loading, error } = useSports();

  // Normalize value to always be an array of strings
  const selectedSports = React.useMemo(() => {
    if (!value) return [];
    return Array.isArray(value)
      ? value.map(String)
      : [String(value)];
  }, [value]);

  // Normalize default checked to always be an array of strings
  const defaultSelectedSports = React.useMemo(() => {
    if (!defaultChecked) return [];
    return Array.isArray(defaultChecked)
      ? defaultChecked.map(String)
      : [String(defaultChecked)];
  }, [defaultChecked]);

  const handleValueChange = (sportId: string) => {
    if (!onChange) return;

    const currentIndex = selectedSports.indexOf(sportId);
    const newSelectedSports =
      currentIndex === -1
        ? [...selectedSports, sportId]
        : selectedSports.filter((id) => id !== sportId);

    onChange(newSelectedSports);
  };

  if (loading) return <div>Loading sports...</div>;
  if (error) return <div>Error loading sports</div>;

  return (
    <div className={`space-x-4 ${className}`}>
      <div className="flex items-center space-x-4">
        {sports.map((sport: TypeSport) => {
          const sportId = String(sport.id);
          const isSelected = selectedSports.includes(sportId);
          const isDefaultChecked = defaultSelectedSports.includes(sportId);

          return (
            <div 
              key={sportId} 
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`sport-${sportId}`}
                checked={isSelected || isDefaultChecked}
                onCheckedChange={() => handleValueChange(sportId)}
                disabled={disabled}
              />
              <Label 
                htmlFor={`sport-${sportId}`} 
                className="cursor-pointer"
              >
                {sport.name}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
