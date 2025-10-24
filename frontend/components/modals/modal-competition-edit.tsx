"use client";

import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrophyIcon } from "lucide-react";

import { Modal } from "@/components/controls/modal";
import { Form } from "@/components/controls/form";
import { components } from "@/types/api-types";
import ServiceCompetition from "@/lib/services/service-competition";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const competitionSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  abbr: z.string().optional(),
  sportId: z.number().optional(),
  note: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).default("active"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  ord: z.number().optional(),
  base64: z.string().optional(),
});

type CompetitionFormData = z.infer<typeof competitionSchema>;

interface CompetitionEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  competition?: components["schemas"]["BaseCompetitionDto"];
  onSave: (competition: components["schemas"]["BaseCompetitionDto"]) => void;
}

export default function CompetitionEditModal({
  isOpen,
  onOpenChange,
  competition,
  onSave,
}: CompetitionEditModalProps) {
  const [loading, setLoading] = React.useState(false);

  const form = useForm<CompetitionFormData>({
    resolver: zodResolver(competitionSchema),
    defaultValues: {
      name: competition?.name || "",
      abbr: competition?.abbr || "",
      sportId: competition?.sportId,
      note: competition?.note || "",
      status: competition?.status || "active",
      startDate: competition?.startDate || "",
      endDate: competition?.endDate || "",
      ord: competition?.ord,
      base64: competition?.base64 || "",
    },
  });

  const handleSubmit = async (data: CompetitionFormData) => {
    setLoading(true);
    try {
      let savedCompetition: components["schemas"]["BaseCompetitionDto"];
      if (competition?.id) {
        // Update existing competition
        savedCompetition = await ServiceCompetition.updateCompetition(competition.id, data);
      } else {
        // Create new competition
        savedCompetition = await ServiceCompetition.createCompetition(data);
      }
      onSave(savedCompetition);
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save competition:", error);
      form.setError("root", { message: "Failed to save competition" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      title={competition?.id ? "Edit Competition" : "Add Competition"}
      description={competition?.id ? "Update the details of this competition" : "Create a new competition"}
      icon={<TrophyIcon />}
    >
      <Form
        form={form}
        onSubmit={handleSubmit}
        loading={loading}
        submitText={competition?.id ? "Update" : "Create"}
        cancelText="Cancel"
      >
        <Form.Field
          control={form.control}
          name="name"
          label="Competition Name"
          placeholder="Enter competition name"
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
          name="sportId"
          label="Sport ID"
          placeholder="Optional sport ID"
          type="number"
        />
        <Form.Field
          control={form.control}
          name="note"
          label="Note"
          placeholder="Optional note"
        />
        <Form.Field
          control={form.control}
          name="status"
          label="Status"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Form.Field
            control={form.control}
            name="startDate"
            label="Start Date"
            type="date"
          />
          <Form.Field
            control={form.control}
            name="endDate"
            label="End Date"
            type="date"
          />
        </div>
        <Form.Field
          control={form.control}
          name="ord"
          label="Order"
          placeholder="Optional order"
          type="number"
        />
        <Form.Field
          control={form.control}
          name="base64"
          label="Image (Base64)"
          placeholder="Optional base64 encoded image"
        />
      </Form>
    </Modal>
  );
}
