"use client";

import React from "react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormItem } from "@/components/controls/form";
import ComboSports from "@/components/combos/combo-sports";

// Team Manager information form configuration
const teamManagerFormConfig = {
  sport: {
    label: "Sport",
    schema: z.string().min(1, "Sport is required"),
    control: <ComboSports />,
    required: true
  },
  team_type: {
    label: "Team Type",
    schema: z.string().min(1, "Team type is required"),
    control: (
      <Input 
        placeholder="Enter team type (Professional, Amateur, etc.)" 
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
  specialization: {
    label: "Specialization",
    schema: z.string().optional(),
    control: <Input placeholder="Enter specialization (optional)" />,
    required: false
  },
  club: {
    label: "Club",
    schema: z.string().optional(),
    control: <Input placeholder="Enter club name (optional)" />,
    required: false
  },
  team: {
    label: "Team",
    schema: z.string().optional(),
    control: <Input placeholder="Enter team name (optional)" />,
    required: false
  }
};

interface TeamManagerInfoPanelProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function PanelTeamManagerInfo({ 
  onSubmit, 
  initialData = {} 
}: TeamManagerInfoPanelProps) {
  const handleSubmit = (data: any) => {
    try {
      // Validate the entire form data
      const validatedData = {
        sport: teamManagerFormConfig.sport.schema.parse(data.sport),
        teamType: teamManagerFormConfig.team_type.schema.parse(data.team_type),
        yearsOfExperience: teamManagerFormConfig.years_of_experience.schema.parse(data.years_of_experience),
        certification: data.certification,
        specialization: data.specialization,
        club: data.club,
        team: data.team
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
          Team Manager Information
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Provide details about your team management experience
        </p>
      </div>

      <div>
        <Form 
          config={teamManagerFormConfig} 
          onSubmit={handleSubmit}
          className="space-y-4"
          defaultValues={initialData}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="sport" />
            <FormItem key="team_type" /> 
            <FormItem key="years_of_experience" />
            <FormItem key="certification" />
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="specialization" />
            <FormItem key="club" />
            <FormItem key="team" />
          </div>
        </Form>
      </div>
    </div>
  );
}
