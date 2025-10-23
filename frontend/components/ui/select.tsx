"use client";

import React from "react";
import ReactSelect, {
  Props as ReactSelectProps,
  MultiValue,
  SingleValue,
  StylesConfig,
  GroupBase,
} from "react-select";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ValueType = "id" | "item";
type ReturnType = "id" | "item";

export interface BaseItem {
  id: string | number;
  name: string;
  base64?: string | null;
  [key: string]: any;
}

export interface SelectProps<Option extends BaseItem = BaseItem>
  extends Omit<ReactSelectProps<Option, boolean>, "onChange" | "value"> {
  value?: string[] | string | number[] | number | Option[] | Option | null;
  onChange?: (value: string[] | Option[] | null | undefined) => void | any;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  data: Option[];
  loading?: boolean;
  error?: string;
  allowClear?: boolean;
  allowFilter?: boolean;
  avatarField?: string;
  valueType?: ValueType;
  returnType?: ReturnType;
  renderItem?: (item: Option) => React.ReactNode;
}

export function Select<Option extends BaseItem = BaseItem>({
  value,
  onChange,
  placeholder = "Select items",
  disabled = false,
  multiple = false,
  data,
  loading = false,
  error,
  allowClear = false,
  allowFilter = false,
  avatarField = "base64",
  valueType = "id",
  returnType = "id",
  renderItem,
  ...props
}: SelectProps<Option>) {
  // Convert data to react-select format
  const selectOptions = (data || []).map((option) => ({
    ...option,
    value: String(option.id),
    label: option.name,
  }));

  // Convert value to react-select value format
  const selectedValue = React.useMemo(() => {
    if (!value) return multiple ? [] : null;

    // If value is an array
    if (Array.isArray(value)) {
      if (valueType === "id") {
        return multiple
          ? selectOptions.filter((option) =>
              value.map(String).includes(String(option.value))
            )
          : selectOptions.find(
              (option) => String(option.value) === String(value[0])
            ) || null;
      } else {
        // Ensure all items are BaseItem when valueType is "item"
        const filteredItems = value.filter(
          (v) => typeof v === "object" && "id" in v
        );
        return multiple
          ? selectOptions.filter((option) =>
              filteredItems.some(
                (item) => String(item.id) === String(option.value)
              )
            )
          : selectOptions.find((option) =>
              filteredItems.some(
                (item) => String(item.id) === String(option.value)
              )
            ) || null;
      }
    }

    // If value is a single item
    if (valueType === "id") {
      return (
        selectOptions.find(
          (option) => String(option.value) === String(value)
        ) || null
      );
    } else {
      // Ensure the single item is a BaseItem when valueType is "item"
      return typeof value === "object" && "id" in value
        ? selectOptions.find(
            (option) => String(option.value) === String(value.id)
          ) || null
        : null;
    }
  }, [value, valueType, selectOptions, multiple]);

  // Handle value change
  const handleChange = (
    selectedOption: MultiValue<Option> | SingleValue<Option>
  ) => {
    if (!onChange) return;

    if (multiple) {
      const selectedItems = selectedOption as Option[];
      const finalValue =
        returnType === "id"
          ? selectedItems.map((item) => String(item.id))
          : selectedItems;
      onChange(finalValue);
    } else {
      const selectedItem = selectedOption as Option | null;
      if (selectedItem) {
        const finalValue =
          returnType === "id" ? String(selectedItem.id) : selectedItem;
        onChange(finalValue as any);
      } else {
        onChange(null);
      }
    }
  };

  // Custom option renderer
  const formatOptionLabel = (option: Option) => {
    if (renderItem) {
      return renderItem(option);
    }

    return (
      <div className="flex items-center space-x-2">
        {option[avatarField] && (
          <Avatar className="h-6 w-6 shrink-0">
            <AvatarImage
              src={option[avatarField]}
              alt={option.name}
              className="object-cover size-6"
            />
            <AvatarFallback className="bg-muted text-foreground">
              {option.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <span className="truncate">{option.name}</span>
      </div>
    );
  };

  return (
    <ReactSelect
      {...props}
      isMulti={multiple}
      options={selectOptions}
      value={selectedValue}
      onChange={handleChange}
      formatOptionLabel={formatOptionLabel}
      placeholder={loading ? "Loading..." : placeholder}
      isDisabled={disabled || loading}
      isLoading={loading}
      isSearchable={allowFilter}
      isClearable={allowClear}
      closeMenuOnSelect={!multiple}
      noOptionsMessage={() => error || "No options available"}
      className={cn(props.className, "w-full")}
      classNames={{
        control: (state) =>
          cn(
            "!min-h-[36px] min-w-[80px] !cursor-pointer !border-primary/40 !hover:border-primary/80",
            "!border !rounded-md !bg-background !shadow-sm",
            state.isDisabled && "!cursor-not-allowed !opacity-50 !bg-background",
            error && "!border-destructive",
            "focus-within:!ring-2",
            "focus-within:!ring-ring",
            "focus-within:!border-ring/80"
          ),
        valueContainer: () => "!pt-0",
        input: () => "!m-0 !p-0",
        placeholder: () => "!text-muted-foreground !text-sm",
        singleValue: () => "!ml-1 !text-sm",
        multiValue: () =>
          "!text-accent-foreground !rounded-sm  !ml-1 !bg-primary/10",
        multiValueLabel: () => "!px-1 !py-0.5",
        multiValueRemove: () =>
          "!px-1 !hover:bg-destructive !hover:text-destructive-foreground",
        menu: () => "!z-500 !rounded-md !border !shadow-md !text-sm !font-base",
        option: (state) =>
          cn(
            "!px-2 !py-1.5",
            "!cursor-pointer",
            state.isSelected && "!bg-primary/10 !text-primary",
            state.isFocused && "!bg-primary/10",
            "hover:!bg-primary/20",
            "!transition-colors !text-sm"
          ),
      }}
      styles={{
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),
        dropdownIndicator: (base, state) => ({
          ...base,
          color: state.isDisabled
            ? "hsl(var(--muted-foreground))"
            : "hsl(var(--muted-foreground))",
          ":hover": {
            color: "hsl(var(--foreground))",
          },
          padding: "0 2px",
        }),
        clearIndicator: (base) => ({
          ...base,
          color: "hsl(var(--muted-foreground))",
          ":hover": {
            color: "hsl(var(--destructive))",
          },
        }),
      }}
      menuPortalTarget={document.body}
    />
  );
}

// Placeholder components for compatibility
export function SelectTrigger() {
  return null;
}

export function SelectValue() {
  return null;
}

export function SelectContent() {
  return null;
}

export function SelectItem() {
  return null;
}

export function SelectGroup() {
  return null;
}

export function SelectLabel() {
  return null;
}
