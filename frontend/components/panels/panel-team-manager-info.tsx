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
import useTeamManagerTypes from "@/hooks/useTeamManagerTypes";
import { Textarea } from "../ui/textarea";

interface TeamManagerInfoPanelProps {
  onSubmit: (data: any) => void;
  initialData?: any;
  onChange?: (data: any) => void;
}

export default function PanelTeamManagerInfo({
  onSubmit,
  initialData = {},
  onChange,
}: TeamManagerInfoPanelProps) {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [sport, setSport] = useState<any>(null);
  const [club, setClub] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [teamManagerType, setTeamManagerType] = useState<any>(null);
  const { sports } = useSports();
  const { clubs } = useClubs();
  const { teams } = useTeams(club?.id, sport?.id);
  const { teamManagerTypes } = useTeamManagerTypes(sport?.id);

  const teamManagerFormConfig = {
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
            setClub(null);
            setTeam(null);
            setTeamManagerType(null);
          }}
        />
      ),
      required: true,
    },
    teamManagerType: {
      label: "Team Manager Type",
      schema: z.any().refine((v) => v && v.id != null && v.id !== "", {
        message: "Team Manager Type is required",
      }),
      control: (
        <Select
          data={teamManagerTypes || []}
          value={teamManagerType}
          onChange={(selectedValue) => {
            setTeamManagerType(selectedValue);
            onChange?.(selectedValue);
          }}
          placeholder="Select Manager Type"
          disabled={!sport}
          valueType="item"
          returnType="item"
        />
      ),
      required: true,
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
          disabled={!clubs || clubs.length === 0 || !sport}
          valueType="item"
          returnType="item"
          onChange={(selectedValue) => {
            setClub(selectedValue);
            setTeam(null);
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
          value={team}
          placeholder={
            !sport ? "Select Sport" : !club ? "Select Club" : "Select Team"
          }
          disabled={!club || !sport}
          valueType="item"
          returnType="item"
          onChange={(selectedValue) => {
            setTeam(selectedValue);
          }}
        />
      ),
      required: true,
    },
    contactName: {
      label: "Contact Name",
      schema: z
        .string()
        .max(50, "Contact Name cannot exceed 50 characters")
        .nonempty("Contact Name is required"),
      control: <Input placeholder="Enter contact name (optional)" />,
      required: true,
    },
    contactPhone: {
      label: "Contact Phone",
      schema: z
        .string()
        .max(20, "Contact Phone cannot exceed 20 characters")
        .nonempty("Contact Phone is required"),
      control: (
        <Input type="tel" placeholder="Enter contact phone (optional)" />
      ),
      required: true,
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

  useEffect(() => {
    setFormErrors([]);

    if (initialData) {
      setSport(initialData.sport ?? null);
      setClub(initialData.club ?? null);
      setTeam(initialData.team ?? null);
      setTeamManagerType(initialData.teamManagerType ?? null);
    }
  }, [initialData]);

  const handleSubmit = (data: any) => {
    try {
      console.log("data::", data);
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
          Team Manager Information
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Help us understand your team management background and expertise
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
          config={teamManagerFormConfig}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <FormItem key="sport" />
            <FormItem key="teamManagerType" />
            <FormItem key="club" />
            <FormItem key="team" />
          </div> 

          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div className="space-y-4">
              <FormItem key="contactName" />
              <FormItem key="contactPhone" />
            </div>
            <div className="md:col-span-3">
              <FormItem key="bio" />
            </div>
          </div>
          <button type="submit" className="hidden" />
        </Form>
      </div>
    </div>
  );
}
