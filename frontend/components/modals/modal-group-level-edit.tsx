"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarIcon } from "lucide-react";

import { Modal } from "@/components/controls/modal";
import { Form } from "@/components/controls/form";
import { TypeGroupLevel } from "@/types/types";
import ServiceGroupLevel from "@/lib/services/service-group-level";

const groupLevelSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  abbr: z.string().optional(),
  note: z.string().optional(),
  description: z.string().optional(),
  minAge: z.number().optional(),
  maxAge: z.number().optional(),
  skillLevel: z.string().optional(),
  ord: z.number().optional(),
});

type GroupLevelFormData = z.infer<typeof groupLevelSchema>;

interface GroupLevelEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groupLevel?: TypeGroupLevel;
  onSave: (groupLevel: TypeGroupLevel) => void;
}

export default function GroupLevelEditModal({
  isOpen,
  onOpenChange,
  groupLevel,
  onSave,
}: GroupLevelEditModalProps) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<GroupLevelFormData>({
    resolver: zodResolver(groupLevelSchema),
    defaultValues: {
      name: groupLevel?.name || "",
      abbr: groupLevel?.abbr || "",
      note: groupLevel?.note || "",
      description: groupLevel?.description || "",
      minAge: groupLevel?.minAge,
      maxAge: groupLevel?.maxAge,
      skillLevel: groupLevel?.skillLevel || "",
      ord: groupLevel?.ord,
    },
  });

  const handleSubmit = async (data: GroupLevelFormData) => {
    setLoading(true);
    try {
      let savedGroupLevel: TypeGroupLevel;
      if (groupLevel?.id) {
        // Update existing group level
        savedGroupLevel = await ServiceGroupLevel.updateGroupLevel(groupLevel.id, data);
      } else {
        // Create new group level
        savedGroupLevel = await ServiceGroupLevel.createGroupLevel(data);
      }
      onSave(savedGroupLevel);
      onOpenChange(false);
    } catch (error: unknown) {
      console.error("Failed to save group level:", error);
      form.setError("root", { message: "Failed to save group level" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={groupLevel?.id ? "Edit Group Level" : "Add Group Level"}
      description={groupLevel?.id ? "Update the details of this group level" : "Create a new group level"}
      icon={<StarIcon />}
    >
      <Form
        form={form}
        onSubmit={handleSubmit}
        loading={loading}
        submitText={groupLevel?.id ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form.Field
          control={form.control}
          name="name"
          label="Group Level Name"
          placeholder="Enter group level name"
          required
        />
        <Form.Field
          control={form.control}
          name="abbr"
          label="Abbreviation"
          placeholder="Optional abbreviation"
        />
        <Form.Field
          control={form.control}
          name="description"
          label="Description"
          placeholder="Optional description"
        />
        <Form.Field
          control={form.control}
          name="note"
          label="Note"
          placeholder="Optional note"
        />
        <Form.Field
          control={form.control}
          name="minAge"
          type="number"
          label="Minimum Age"
          placeholder="Optional minimum age"
        />
        <Form.Field
          control={form.control}
          name="maxAge"
          type="number"
          label="Maximum Age"
          placeholder="Optional maximum age"
        />
        <Form.Field
          control={form.control}
          name="skillLevel"
          label="Skill Level"
          placeholder="Optional skill level"
        />
        <Form.Field
          control={form.control}
          name="ord"
          type="number"
          label="Order"
          placeholder="Optional order"
        />
      </Form>
    </Modal>
  );
}
