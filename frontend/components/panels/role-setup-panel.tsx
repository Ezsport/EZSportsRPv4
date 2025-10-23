"use client";

import React from "react";
import {
  AwardIcon,
  UsersIcon,
  CheckIcon,
  CheckCircle2Icon,
  InfoIcon,
} from "lucide-react";

const roleOptions = [
  {
    role: "coach",
    label: "Coach",
    description: "Manage team training and performance",
    icon: AwardIcon,
    color: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-300",
  },
  {
    role: "team-manager",
    label: "Team Manager",
    description: "Oversee team operations and logistics",
    icon: UsersIcon,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-300",
  },
  {
    role: "referee",
    label: "Referee",
    description: "Officiate and manage sports events",
    icon: CheckIcon,
    color: "bg-red-50",
    iconColor: "text-red-600",
    borderColor: "border-red-300",
  },
];

interface RoleSetupPanelProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
}

export default function RoleSetupPanel({
  selectedRole,
  onRoleSelect,
}: RoleSetupPanelProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Select Your Role
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Choose the role that best describes your position in sports management
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {roleOptions.map((roleOption) => {
          const RoleIcon = roleOption.icon;
          const isSelected = selectedRole === roleOption.role;

          return (
            <div
              key={roleOption.role}
              onClick={() => onRoleSelect(roleOption.role)}
              className={`
                border-2 rounded-xl p-6 cursor-pointer transition-all group relative
                ${
                  isSelected
                    ? `${roleOption.borderColor} ${roleOption.color} border-primary`
                    : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
                }
                flex
              `}
            >
              <div
                className={`
                  mb-4 w-16 h-16 rounded-full flex items-center justify-center
                  ${
                    isSelected
                      ? `${roleOption.iconColor} bg-white shadow-md`
                      : `${roleOption.iconColor} bg-${roleOption.color.replace(
                          "bg-",
                          ""
                        )} group-hover:bg-white group-hover:shadow-md`
                  }
                  transition-all
                `}
              >
                <RoleIcon className="w-8 h-8" strokeWidth={1.5} />
              </div>

              <div className="text-center">
                <h4
                  className={`
                  text-lg font-semibold mb-2
                  ${isSelected ? "text-primary" : "text-gray-800"}
                `}
                >
                  {roleOption.label}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {roleOption.description}
                </p>
              </div>

              {isSelected && (
                <div className="absolute top-0 right-0 m-3">
                  <CheckCircle2Icon
                    className={`
                      w-6 h-6 
                      ${roleOption.iconColor}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="setup-later"
            className="mr-3 text-primary focus:ring-primary"
            checked={selectedRole === "later"}
            onChange={() =>
              onRoleSelect(selectedRole === "later" ? null : "later")
            }
          />
          <label
            htmlFor="setup-later"
            className="text-muted-foreground cursor-pointer select-none"
          >
            I'll set up my role later
          </label>
        </div>
      </div>

      {selectedRole === "later" && (
        <div className="text-center mt-4 text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-4">
          <InfoIcon className="inline-block mr-2 text-blue-600" />
          You can complete your role setup in your profile settings after
          registration.
        </div>
      )}
    </div>
  );
}
