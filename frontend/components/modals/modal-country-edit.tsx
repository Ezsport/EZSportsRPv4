import * as React from "react";
import { z } from "zod";
import { Modal } from "@/components/controls/modal";
import { Buttons } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AvatarPicker from "@/components/pickers/picker-avatar";
import { Form, FormItem } from "@/components/controls/form";
import { Separator } from "@/components/ui/separator";
import { TypeCountry } from "@/types/types";
import { ServiceCountry } from "@/lib/services/service-country";

type CountryEditModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  country?: TypeCountry;
  onSave: (countryData: TypeCountry) => void;
};

const CountryEditModal: React.FC<CountryEditModalProps> = ({
  isOpen,
  onOpenChange,
  country,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const formConfig = {
    base64: {
      label: "Flag",
      schema: z.union([z.string(), z.null(), z.undefined()]).optional(),
      control: <AvatarPicker image={country?.base64} />,
      className: "flex flex-col",
      required: false,
    },
    name: {
      label: "Country Name",
      schema: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
      control: <Input />,
      required: true,
    },
    abbr: {
      label: "Abbreviation",
      schema: z
        .string()
        .max(10, "Abbreviation cannot exceed 10 characters")
        .optional(),
      control: <Input />,
    },
    code: {
      label: "Code",
      schema: z.string().max(6, "Code cannot exceed 10 characters"),
      control: <Input maxLength={5} />,
      description: "Enter a dial code for country",
    },
    note: {
      label: "Description",
      schema: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      control: <Textarea rows={3} />,
      description: "Optional description of the country",
    },
    isActive: {
      label: "Active",
      schema: z.boolean(),
      control: <Switch checked={country?.isActive ?? false} />,
      description: "Toggle country's active status",
    },
  };

  const handleSubmit = React.useCallback(
    (data: any) => {
      const countryData: TypeCountry = {
        name: data.name.trim(),
        abbr: data.abbr?.trim().toUpperCase() || undefined,
        code: data.code?.trim() || undefined,
        note: data.note?.trim() || undefined,
        isActive: data.isActive,
        base64: data.base64 || undefined,
      };
      console.log(countryData)

      if (country?.id) {
        ServiceCountry.updateCountry(country?.id, countryData).then(() => {
          onSave(countryData);
          onOpenChange(false);
        });
      } else {
        ServiceCountry.createCountry(countryData).then((newCountry) => {
          countryData.id = newCountry.id;
          onSave(countryData);
          onOpenChange(false);
        });
      }
    },
    [onSave, onOpenChange, country]
  );

  const triggerFormSubmit = () => {
    if (formRef.current) {
      const submitButton = formRef.current.querySelector(
        'button[type="submit"]'
      ) as HTMLButtonElement;
      if (submitButton) {
        submitButton.click();
      }
    }
  };

  return (
    <Modal
      size="md"
      open={isOpen}
      onOpenChange={onOpenChange}
      title={country?.id ? "Edit Country" : "Add New Country"}
      description={
        country?.id
          ? "Update the details of the existing country"
          : "Create a new country in the system"
      }
    >
      <Form
        ref={formRef}
        config={formConfig}
        onSubmit={handleSubmit}
        className="flex gap-4"
        initialValues={country}
      >
        <FormItem key="base64" className="w-[120px]" />
        <Separator orientation="vertical" />
        <div className="space-y-4 w-full">
          <FormItem key="name" />
          <FormItem key="abbr" />
          <FormItem key="code" />
          <FormItem key="note" />
          <FormItem key="isActive" />
        </div>
      </Form>

      <Separator />
      {/* Footer with centered buttons */}
      <div className="flex justify-center space-x-2">
        <Buttons.Save onClick={triggerFormSubmit} />
        <Buttons.Cancel onClick={() => onOpenChange(false)} />
      </div>
    </Modal>
  );
};

export default CountryEditModal;
