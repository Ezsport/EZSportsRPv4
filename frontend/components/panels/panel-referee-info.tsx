"use client";

import React from "react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormItem } from "@/components/controls/form";
import ComboSports from "@/components/combos/combo-sports";

// Referee information form configuration
const refereeFormConfig = {
  sport: {
    label: "Sport",
    schema: z.string().min(1, "Sport is required"),
    control: <ComboSports />,
    required: true
  },
  referee_type: {
    label: "Referee Type",
    schema: z.string().min(1, "Referee type is required"),
    control: (
      <Input 
        placeholder="Enter referee type (Professional, Amateur, etc.)" 
      />
    ),
    required: true
  },
  years_of_experience: {
    label: "Years of Experience",
    schema: z.string().refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Years of experience must be a non-negative number"
    }),
    control: <Input type="number" placeholder="Enter years of experience" />,
    required: true
  },
  certification: {
    label: "Certification",
    schema: z.string().optional(),
    control: <Input placeholder="Enter certification (optional)" />,
    required: false
  },
  level: {
    label: "Referee Level",
    schema: z.string().optional(),
    control: <Input placeholder="Enter referee level (optional)" />,
    required: false
  },
  bio: {
    label: "Professional Bio",
    schema: z.string().optional(),
    control: <Textarea placeholder="Share a brief professional bio (optional)" rows={4} />,
    required: false
  }
};

interface RefereeInfoPanelProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function PanelRefereeInfo({ 
  onSubmit, 
  initialData = {} 
}: RefereeInfoPanelProps) {
  const handleSubmit = (data: any) => {
    try {
      // Validate the entire form data
      const validatedData = {
        sport: refereeFormConfig.sport.schema.parse(data.sport),
        refereeType: refereeFormConfig.referee_type.schema.parse(data.referee_type),
        yearsOfExperience: refereeFormConfig.years_of_experience.schema.parse(data.years_of_experience),
        certification: data.certification,
        level: data.level,
        bio: data.bio
      };

      // Proceed to next step
      onSubmit(validatedData);
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        // Display specific validation error messages
        const errorMessages = error.errors.map(err => err.message);
        alert(errorMessages.join('\n'));
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
          defaultValues={initialData}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="sport" />
            <FormItem key="referee_type" /> 
            <FormItem key="years_of_experience" />
            <FormItem key="certification" />
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="level" />
            <div className="md:col-span-3">
              <FormItem key="bio" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
