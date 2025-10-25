"use client";

import React, { useEffect, useState } from "react";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Form, FormItem } from "@/components/controls/form";
import useCoachTypes from "@/hooks/useCoachTypes";
import useSports from "@/hooks/useSports";
import useTeams from "@/hooks/useTeams";
import useClubs from "@/hooks/useClubs";

import { components } from "@/types/api-types";

interface CoachInfoPanelProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onChange?: (data: any) => void;
}

export default function PanelCoachInfo({
  onSubmit,
  initialData = {},
  onChange,
}: CoachInfoPanelProps) {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [sport, setSport] = useState<any | null>();
  const [club, setClub] = useState<any | null>();
  const { sports } = useSports();
  const { clubs } = useClubs();
  const { teams } = useTeams(club?.id, sport?.id);
  const { coachTypes } = useCoachTypes(sport?.id);

  const coachFormConfig = {
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
    coachType: {
      label: "Coach Type",
      schema: z.any().refine((v) => v && v.id != null && v.id !== "", {
        message: "Coach type is required",
      }),
      control: (
        <Select
          data={coachTypes as any[]}
          onChange={(v) => {
            onChange?.(v);
          }}
          placeholder="Select Coach Type"
          disabled={!sport}
          valueType="item"
          returnType="item"
        />
      ),
      required: true,
    },
    yearsOfExperience: {
      label: "Years of Experience",
      schema: z.string().nonempty("Years of experience is required"),
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
      schema: z.any().refine((v) => v && v.id != null && v.id !== "", {
        message: "Club is required",
      }),
      control: (
        <Select
          data={clubs || []}
          value={club}
          placeholder="Select Club"
          disabled={!clubs || clubs.length === 0}
          valueType="item"
          returnType="item"
          onChange={(v) => {
            setClub(v);
          }}
        />
      ),
      required: true,
    },
    team: {
      label: "Team",
      schema: z.any().refine((v) => v && v.id != null && v.id !== "", {
        message: "Team is required",
      }),
      control: (
        <Select
          data={teams || []}
          placeholder={
            !sport ? "Select Sport" : !club ? "Select Club" : "Select Team"
          }
          disabled={!club || !sport}
          valueType="item"
          returnType="item"
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

  // useEffect(() => {
  //   if (sport) {
  //     console.log("coachTypes::", coachTypes)
  //     setData({ ...data, coachType: null });
  //   }
  // }, [sport]);

  const handleSubmit = (data: any) => {
    try {
      onSubmit(data);
    } catch (error) {
      console.log("error::", error);
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
          initialValues={initialData}
          config={coachFormConfig}
          onSubmit={handleSubmit}
          className="space-y-4"
          onBeforeValidate={(v) => {
            console.log("onBeforeValidate::", v);
            return {
              ...v,
              coachType: null,
            };
          }}
        >
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="sport" />
            <FormItem key="coachType" />
            <FormItem key="club" />
            <FormItem key="team" />
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="yearsOfExperience" />
            <FormItem key="certification" />
            <FormItem key="specialization" />
          </div>
          <button type="submit" className="hidden" />
        </Form>
      </div>
    </div>
  );
}
