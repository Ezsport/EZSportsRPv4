"use client";

import React, { useEffect, useState } from "react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Form, FormItem } from "@/components/controls/form";
import ComboSports from "@/components/combos/combo-sports";
import ComboCoachTypes from "../combos/combo-coach-types";
import ComboClubs from "../combos/combo-clubs";
import ComboTeams from "../combos/combo-teams";

interface CoachInfoPanelProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function PanelCoachInfo({
  onSubmit,
  initialData = {},
}: CoachInfoPanelProps) {
  const [sport, setSport] = useState<any | null>();
  const [club, setClub] = useState<any | null>();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const coachFormConfig = {
    sport: {
      label: "Sport",
      schema: z.object({
        id: z.number(),
        name: z.string(),
        abbr: z.string().optional(),
        note: z.string().optional(),
        isActive: z.boolean().optional(),
        ord: z.number().optional(),
        base64: z.string().optional(),
      }),
      control: (
        <ComboSports
          valueType="item"
          returnType="item"
          value={sport}
          onValueChange={(v) => {
            setSport(v);
          }}
        />
      ),
      required: true,
    },
    coachType: {
      label: "Coach Type",
      schema: z.string().min(1, "Coach type is required"),
      control: (
        <ComboCoachTypes
          sportId={sport?.id}
          disabled={!sport}
          placeholder={!sport ? "Select Sport first" : "Select Coach Type"}
        />
      ),
      required: true,
    },
    yearsOfExperience: {
      label: "Years of Experience",
      schema: z
        .string()
        .refine(
          (val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 70,
          {
            message: "Non-negative number (0-70 years)",
          }
        ),
      control: <Input type="number" placeholder="Enter years of experience" />,
      required: true,
    },
    certification: {
      label: "Certification",
      schema: z
        .string()
        .max(200, "Certification cannot exceed 200 characters")
        .optional(),
      control: <Input placeholder="Enter certification (optional)" />,
      required: false,
    },
    specialization: {
      label: "Specialization",
      schema: z
        .string()
        .max(200, "Specialization cannot exceed 200 characters")
        .optional(),
      control: <Input placeholder="Enter specialization (optional)" />,
      required: false,
    },
    club: {
      label: "Club",
      schema: z.object({
        id: z.string(), 
        name: z.string(),
        abbr: z.string().optional(),
        note: z.string().optional(),
        isActive: z.boolean().optional(),
        ord: z.number().optional(),
        base64: z.string().optional(),
      }),
      control: (
        <ComboClubs
          valueType="item"
          returnType="item"
          value={club}
          onValueChange={(v) => {
            setClub(v);
          }}
        />
      ),
      required: true,
    },
    team: {
      label: "Team",
      schema: z.object({
        id: z.string(),
        name: z.string(),
        abbr: z.string().optional(),
        note: z.string().optional(),
        isActive: z.boolean().optional(),
        ord: z.number().optional(),
        base64: z.string().optional(),
      }),
      control: (
        <ComboTeams
          valueType="item"
          returnType="item"
          club={club}
          sport={sport}
          disabled={!club || !sport}
          placeholder={
            !sport ? "Select Sport" : !club ? "Select Club" : "Select Team"
          }
        />
      ),
      required: true,
    },
  };

  useEffect(() => {
    if (initialData) {
      setFormErrors([]);
      setSport(initialData.sport);
      setClub(initialData.club);
    }
  }, [initialData]);

  const handleSubmit = (data: any) => {
    try {
      console.log("data", data);

      const validatedData = {
        sport: coachFormConfig.sport.schema.parse(data.sport),
        coachType: coachFormConfig.coachType.schema.parse(data.coachType),
        yearsOfExperience: coachFormConfig.yearsOfExperience.schema.parse(
          data.yearsOfExperience
        ),
        certification: coachFormConfig.certification.schema.parse(
          data.certification
        ),
        specialization: coachFormConfig.specialization.schema.parse(
          data.specialization
        ),
        club: coachFormConfig.club.schema.parse(data.club),
        team: coachFormConfig.team.schema.parse(data.team),
      };

      setFormErrors([]);

      onSubmit(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => issue.message);
        setFormErrors(errorMessages);
      } else if (error instanceof Error) {
        setFormErrors([error.message]);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Coach Information
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Help us understand your coaching background and expertise
        </p>
      </div>

      {/* Display form-level errors */}
      {formErrors.length > 0 && (
        <div
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <ul className="list-disc list-inside">
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <Form
          config={coachFormConfig}
          onSubmit={handleSubmit}
          className="space-y-4"
          initialValues={initialData}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="sport" />
            <FormItem key="coachType" />
            <FormItem key="yearsOfExperience" />
            <FormItem key="certification" />
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="specialization" />
            <FormItem key="club" />
            <FormItem key="team" />
          </div>
          <button type="submit" className="hidden" />
        </Form>
      </div>
    </div>
  );
}
