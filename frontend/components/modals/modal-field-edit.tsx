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
import { TypeField } from "@/types/types";
import { ComboCountries } from "@/components/combos/combo-countries";
import { ServiceField } from "@/lib/services/service-field";
import { CheckerSports } from "../checkers/checker-sports";

type FieldEditModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  field?: TypeField;
  onSave: (fieldData: TypeField) => void;
};

const FieldEditModal: React.FC<FieldEditModalProps> = ({
  isOpen,
  onOpenChange,
  field,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const formConfig = {
    base64: {
      label: "Field Image",
      schema: z.union([z.string(), z.null(), z.undefined()]).optional(),
      control: <AvatarPicker image={field?.base64} />,
      className: "flex flex-col",
      required: false,
    },
    name: {
      label: "Field Name",
      schema: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),
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
    countryId: {
      label: "Country",
      schema: z.union([z.number(), z.string()]).optional(),
      control: (
        <ComboCountries className="w-full" placeholder="Select a country" />
      ),
    },
    sportIds: {
      label: "Sports",
      schema: z
        .union([
          z.array(z.number()),
          z.array(z.string()),
          z.number(),
          z.string(),
        ])
        .optional(),
      control: <CheckerSports />,
      description: "Optional sports associated with the field",
    } as const,
    note: {
      label: "Note",
      schema: z
        .string()
        .max(500, "Note cannot exceed 500 characters")
        .optional(),
      control: <Textarea rows={3} />,
      description: "Optional additional information",
    },
    isActive: {
      label: "Active",
      schema: z.boolean(),
      control: <Switch />,
    },
  };

  const handleSubmit = React.useCallback(
    (data: any) => {
      const fieldData: TypeField = {
        name: data.name.trim(),
        abbr: data.abbr?.trim() || undefined,
        base64: data.base64 || undefined,
        countryId: data.countryId ? Number(data.countryId) : undefined,
        sportIds: data.sportIds
          ? Array.isArray(data.sportIds)
            ? data.sportIds.map(Number)
            : [Number(data.sportIds)]
          : undefined,
        note: data.note?.trim() || undefined,
        isActive: data.isActive,
      };
      
      if (field?.id) {
        ServiceField.updateField(field?.id, fieldData).then(() => {
          onSave(fieldData);
          onOpenChange(false);
        });
      } else {
        ServiceField.createField(fieldData).then((newField) => {
          onSave(newField);
          onOpenChange(false);
        });
      }
    },
    [onSave, onOpenChange, field]
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
      open={isOpen}
      onOpenChange={onOpenChange}
      title={field?.id ? "Edit Field" : "Add New Field"}
      description={
        field?.id
          ? "Update the details of the existing field"
          : "Create a new field in the system"
      }
    >
      <Form
        ref={formRef}
        config={formConfig}
        onSubmit={handleSubmit}
        className="flex gap-4"
        initialValues={field}
      >
        <FormItem key="base64" className="w-[120px]" />
        <Separator orientation="vertical" />
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="name" />
            <FormItem key="abbr" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="countryId" />
            <FormItem key="isActive" />
          </div>
          <FormItem key="sportIds" />
          <FormItem key="note" />
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

export default FieldEditModal;
