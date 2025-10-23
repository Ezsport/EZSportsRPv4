"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/controls/button";

interface ReviewPanelProps {
  accountInfo: any;
  selectedRole: string | null;
  roleInfo?: any;
  selectedMembership: string | null;
  players?: any[];
  onSubmit: () => void;
}

export default function PanelReview({ 
  accountInfo, 
  selectedRole, 
  roleInfo, 
  selectedMembership, 
  players,
  onSubmit 
}: ReviewPanelProps) {
  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Review Your Registration
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Please review the details before completing your registration
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Account Information Column */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4 border">
          <h4 className="font-semibold text-primary border-b pb-2">
            Account Details
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Full Name:</span>
              <span className="font-medium">
                {accountInfo.first_name} {accountInfo.last_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium">{accountInfo.email}</span>
            </div>
          </div>
        </div>

        {/* Role and Membership Column */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4 border">
          <h4 className="font-semibold text-primary border-b pb-2">
            Profile Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Role:</span>
              <span className="font-medium capitalize">
                {selectedRole?.replace("-", " ") || "Not Selected"}
              </span>
            </div>
            {roleInfo && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role Details:</span>
                <span className="font-medium">
                  {roleInfo.sport} {roleInfo.refereeType || roleInfo.coachType || roleInfo.teamType}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Membership Tier:</span>
              <span className="font-medium capitalize">
                {selectedMembership?.replace("-", " ") || "Not Selected"}
                {selectedMembership === "pro" && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                )}
              </span>
            </div>
            {selectedMembership === "pro" && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Annual Price:</span>
                <span className="font-medium">$468/year</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Team Setup Section */}
      {players && players.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-4 mt-6">
          <h4 className="text-xl font-semibold text-primary border-b pb-2">
            Team Roster
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Position</th>
                  <th className="p-3 text-left">Age</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="p-3">{player.name}</td>
                    <td className="p-3">{player.position}</td>
                    <td className="p-3">{player.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
