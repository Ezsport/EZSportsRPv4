"use client";

import React from "react";
import { CheckCircle2Icon, InfoIcon } from "lucide-react";

type MembershipTier = "starter" | "pro" | "enterprise" | null;

const membershipOptions = [
  {
    tier: "starter",
    label: "Starter",
    price: 0,
    description: "Basic features for individuals",
    color: "bg-green-50",
    borderColor: "border-green-300",
    textColor: "text-green-600"
  },
  {
    tier: "pro",
    label: "Pro",
    price: 49,
    description: "Advanced tools for growing teams",
    color: "bg-blue-50",
    borderColor: "border-blue-300",
    textColor: "text-blue-600",
    popular: true
  },
  {
    tier: "enterprise",
    label: "Enterprise",
    price: "Custom",
    description: "Tailored solutions for organizations",
    color: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-600"
  }
];

interface MembershipPanelProps {
  selectedMembership: MembershipTier;
  onMembershipSelect: (membership: MembershipTier) => void;
}

export default function PanelMembership({ 
  selectedMembership, 
  onMembershipSelect 
}: MembershipPanelProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Choose Your Membership
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Select a plan that fits your team's needs and growth strategy
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {membershipOptions.map((membershipOption) => {
          const isSelected = selectedMembership === membershipOption.tier;

          return (
            <div 
              key={membershipOption.tier}
              onClick={() => onMembershipSelect(membershipOption.tier as MembershipTier)}
              className={`
                border-2 rounded-xl p-6 cursor-pointer transition-all group relative
                ${isSelected 
                  ? `${membershipOption.borderColor} ${membershipOption.color} border-primary` 
                  : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'}
                flex flex-col
              `}
            >
              {membershipOption.popular && (
                <div className="absolute top-0 right-0 m-3">
                  <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </span>
                </div>
              )}

              {isSelected && (
                <div className="absolute top-0 left-0 m-3">
                  <CheckCircle2Icon 
                    className={`
                      w-6 h-6 
                      ${membershipOption.textColor}
                    `} 
                  />
                </div>
              )}

              <div className="text-center">
                <h4 className={`
                  text-2xl font-bold mb-2
                  ${isSelected ? membershipOption.textColor : 'text-gray-800'}
                `}>
                  {membershipOption.label}
                </h4>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    {typeof membershipOption.price === 'number' 
                      ? `$${membershipOption.price}` 
                      : membershipOption.price}
                  </span>
                  {typeof membershipOption.price === 'number' && (
                    <span className="text-muted-foreground ml-2">/mo</span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {membershipOption.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
