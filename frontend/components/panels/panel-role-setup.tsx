"use client";

import React, { useState } from "react";
import { 
  AwardIcon, 
  UsersIcon, 
  Mic2 as WhistleIcon,
  CheckCircle2Icon,
  InfoIcon
} from "lucide-react";

const roleOptions = [
  {
    role: "coach",
    label: "Coach",
    description: "Manage and train athletes",
    icon: AwardIcon,
    iconColor: "text-yellow-500",
    color: "bg-yellow-50",
    borderColor: "border-yellow-500/50"
  },
  {
    role: "team-manager",
    label: "Team Manager",
    description: "Coordinate team operations",
    icon: UsersIcon,
    iconColor: "text-blue-500",
    color: "bg-blue-50",
    borderColor: "border-blue-500/50"
  },
  {
    role: "referee",
    label: "Referee",
    description: "Officiate sports events",
    icon: WhistleIcon,
    iconColor: "text-green-500",
    color: "bg-green-50",
    borderColor: "border-green-500/50"
  }
];

interface RoleSetupPanelProps {
  selectedRole: string | null;
  onRoleSelect: (role: "coach" | "team-manager" | "referee" | "later" | null) => void;
}

export default function PanelRoleSetup({ 
  selectedRole, 
  onRoleSelect 
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

          return (
            <div 
              key={roleOption.role}
              onClick={() => onRoleSelect(roleOption.role as "coach" | "team-manager" | "referee" | "later" | null)}
              className={`
                border-2 rounded-xl p-6 cursor-pointer transition-all group relative
                ${selectedRole === roleOption.role 
                  ? `${roleOption.borderColor} ${roleOption.color} border-primary` 
                  : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
                flex flex-col
              `}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className={`
                    w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0
                    ${selectedRole === roleOption.role 
                      ? `${roleOption.iconColor} bg-white shadow-md` 
                      : `${roleOption.iconColor} bg-${roleOption.color.replace('bg-', '')} group-hover:bg-white group-hover:shadow-md`}
                    transition-all
                  `}
                >
                  {RoleIcon && <RoleIcon className="w-8 h-8" strokeWidth={1.5} />}
                </div>
                
                <div className="flex-grow">
                  <h4 className={`
                    text-lg font-semibold
                    ${selectedRole === roleOption.role ? 'text-primary' : 'text-gray-800'}
                  `}>
                    {roleOption.label}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground">
                    {roleOption.description}
                  </p>
                </div>

                {selectedRole === roleOption.role && (
                  <div className="text-primary absolute bottom-2 right-2">
                    <CheckCircle2Icon 
                      className={`
                        w-6 h-6 
                        ${roleOption.iconColor}
                      `} 
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Set up role later checkbox */}
      <div className="relative flex items-center justify-center mt-6">
        <div className="absolute left-0 right-0 flex items-center justify-center">
          <input
            type="checkbox"
            id="setup-later"
            className="mr-3 text-primary focus:ring-primary"
            checked={selectedRole === 'later'}
            onChange={() => onRoleSelect(selectedRole === 'later' ? null : 'later')}
          />
          <label 
            htmlFor="setup-later" 
            className="text-muted-foreground cursor-pointer select-none"
          >
            I'll set up my role later
          </label>
        </div>
      </div>
    </div>
  );
}
