"use client"

import React, { useEffect, useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useCountries } from "@/hooks/useCountries";
import { TypeCountry } from "@/lib/types";

type CountryComboProps = {
  value?: string | number | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function ComboCountries({
  value = null,
  onChange,
  placeholder = "Select a country",
  disabled = false,
  className,
}: CountryComboProps) {
  const { countries, loading, error } = useCountries();
  const [selectedValue, setSelectedValue] = useState<string>(value !== null ? String(value) : "");

  // Sync prop value with internal state
  useEffect(() => {
    setSelectedValue(value !== null ? String(value) : "");
  }, [value]);

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Select
      value={selectedValue} 
      onValueChange={handleValueChange}
      disabled={disabled || loading}
    >
      <SelectTrigger className={className}>
        <SelectValue
          placeholder={loading ? "Loading countries..." : placeholder}
        />
      </SelectTrigger>

      <SelectContent>
        {loading && (
          <SelectItem value="" disabled>
            Loading countries...
          </SelectItem>
        )}

        {error && (
          <SelectItem value="" disabled>
            Error loading countries
          </SelectItem>
        )}

        {!loading && !error && countries.map((country: TypeCountry) => (
          <SelectItem 
            key={country.id} 
            value={String(country.id)}
          >
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
