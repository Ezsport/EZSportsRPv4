"use client";

import React, { useState } from "react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormItem } from "@/components/controls/form";
import ComboSports from "@/components/combos/combo-sports";
import useSports from "@/hooks/useSports";
import { Select } from "../ui/select";
import useRefereeTypes from "@/hooks/useRefereeTypes";

interface RefereeInfoPanelProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function PanelRefereeInfo({
  onSubmit,
  initialData = {},
}: RefereeInfoPanelProps) {
  const [sport, setSport] = useState<any>(null);
  const { sports } = useSports();
  const { refereeTypes } = useRefereeTypes(sport?.id);

  // Referee information form configuration
  const refereeFormConfig = {
    sport: {
      label: "Sport",
      schema: z.any().refine((v) => v && v.id != null && v.id !== "", {
        message: "Sport is required",
      }),
      control: (
        <Select
          data={sports || []}
          value={sport}
          placeholder="Select Sport"
          disabled={!sports || sports.length === 0}
          valueType="item"
          returnType="item"
          onChange={(selectedValue) => {
            setSport(selectedValue);
          }}
        />
      ),
      required: true,
    },
    referee_type: {
      label: "Referee Type",
      schema: z.any().refine((v) => v && v.id != null && v.id !== "", {
        message: "Referee type is required",
      }),
      control: (
        <Select
          data={refereeTypes}
          placeholder="Select Referee Type"
          disabled={!sport}
          valueType="item"
          returnType="item"
        />
      ),
      required: true,
    },
    years_of_experience: {
      label: "Years of Experience",
      schema: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
          message: "Years of experience must be a non-negative number",
        }),
      control: <Input type="number" placeholder="Enter years of experience" />,
      required: true,
    },
    certification: {
      label: "Certification",
      schema: z.string().optional(),
      control: <Input placeholder="Enter certification (optional)" />,
      required: false,
    },
    level: {
      label: "Referee Level",
      schema: z.string().optional(),
      control: <Input placeholder="Enter referee level (optional)" />,
      required: false,
    },
    bio: {
      label: "Professional Bio",
      schema: z.string().optional(),
      control: (
        <Textarea
          placeholder="Share a brief professional bio (optional)"
          rows={5}
        />
      ),
      required: false,
    },
  };

  const handleSubmit = (data: any) => {
    try {
      onSubmit(data);
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        // Display specific validation error messages
        const errorMessages = error.errors.map((err) => err.message);
        alert(errorMessages.join("\n"));
      } else if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Referee Information
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Share details about your refereeing experience and qualifications
        </p>
      </div>

      <div>
        <Form
          config={refereeFormConfig}
          onSubmit={handleSubmit}
          className="space-y-4"
          initialValues={initialData}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="sport" />
            <FormItem key="referee_type" />
            <FormItem key="years_of_experience" />
            <FormItem key="level" />
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="certification" />
            <div className="md:col-span-3">
              <FormItem key="bio" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
