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
import { CoachType } from "@/lib/services/service-coach-type";
import { ServiceCoachType } from "@/lib/services/service-coach-type";
import { Select } from "@/components/ui/select";
import useSports from "@/hooks/useSports";

type CoachTypeEditModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coachType?: CoachType;
  onSave: (coachTypeData: CoachType) => void;
};

const CoachTypeEditModal: React.FC<CoachTypeEditModalProps> = ({
  isOpen,
  onOpenChange,
  coachType,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const { sports } = useSports();

  const formConfig = {
    base64: {
      label: "Coach Type Logo",
      schema: z.union([z.string(), z.null(), z.undefined()]).optional(),
      control: <AvatarPicker image={coachType?.base64} />,
      className: "flex flex-col",
      required: false,
    },
    name: {
      label: "Coach Type Name",
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
        .min(2, "Abbreviation must be at least 2 characters")
        .max(10, "Abbreviation cannot exceed 10 characters")
        .regex(/^[A-Z]+$/, "Abbreviation must be uppercase letters"),
      control: <Input maxLength={10} />,
      description: "Enter an abbreviation (e.g. HC, AC, DC)",
      required: true,
    },
    sportId: {
      label: "Sport",
      schema: z.string().min(1, "Please select a sport"),
      control: (
        <Select
          data={sports}
          placeholder="Select Sport"
          value={coachType?.sportId}
        />
      ),
      required: true,
    },
    note: {
      label: "Description",
      schema: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      control: <Textarea rows={3} />,
    },
    // isActive: {
    //   label: "Active",
    //   schema: z.boolean(),
    //   control: <Switch />,
    // },
  };

  const triggerFormSubmit = React.useCallback(() => {
    if (formRef.current) {
      try {
        const submitEvent = new Event("submit", { cancelable: true });
        formRef.current.dispatchEvent(submitEvent);

        if (formRef.current.requestSubmit) {
          formRef.current.requestSubmit();
        }
      } catch (error) {
        // Silently handle any submission errors
      }
    }
  }, [formRef, coachType]);

  const handleSubmit = React.useCallback(
    (data: any) => {
      // Ensure sportId is converted to a number
      data.sportId = Number(data.sportId);

      // Preserve existing order if editing
      data.ord = coachType?.ord || 0;

      // Convert isActive to boolean
      data.isActive = data.isActive ? true : false;

      if (coachType?.id) {
        // Update existing coach type
        ServiceCoachType.update(String(coachType.id), data).then(() => {
          onSave({ ...coachType, ...data });
          onOpenChange(false);
        });
      } else {
        // Create new coach type
        ServiceCoachType.create(data).then((newCoachType) => {
          onSave(newCoachType);
          onOpenChange(false);
        });
      }
    },
    [coachType, onSave, onOpenChange]
  );

  return (
    <Modal
      size="md"
      open={isOpen}
      onOpenChange={onOpenChange}
      title={coachType?.id ? "Edit Coach Type" : "Add New Coach Type"}
      description={
        coachType?.id
          ? "Update the details of the existing coach type"
          : "Create a new coach type in the system"
      }
    >
      <Form
        ref={formRef}
        config={formConfig}
        onSubmit={handleSubmit}
        className="flex gap-4"
        initialValues={coachType}
      >
        <FormItem key="base64" className="w-[120px]" />
        <Separator orientation="vertical" />
        <div className="space-y-4 w-full">
          <FormItem key="name" />
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="abbr" />
            <FormItem key="sportId" />
            {/* <FormItem key="isActive" /> */}
          </div>
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

export default CoachTypeEditModal;
