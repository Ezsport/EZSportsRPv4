"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/controls/button";
import { Form, FormItem } from "@/components/controls/form";
import { CheckIcon } from "lucide-react";

// Define schema for account info validation
const accountInfoSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

// Social login buttons
const socialLogins = [
  {
    name: "Google",
    icon: <CheckIcon className="w-5 h-5" />,
    color: "bg-red-500",
  },
  {
    name: "Facebook",
    icon: <CheckIcon className="w-5 h-5" />,
    color: "bg-blue-600",
  },
  {
    name: "LinkedIn",
    icon: <CheckIcon className="w-5 h-5" />,
    color: "bg-blue-700",
  },
  {
    name: "GitHub",
    icon: <CheckIcon className="w-5 h-5" />,
    color: "bg-gray-800",
  },
];

interface AccountInfoPanelProps {
  onSubmit: (data: z.infer<typeof accountInfoSchema>) => void;
}

export default function PanelAccountInfo({ 
  onSubmit,
  initialData = {} 
}: { 
  onSubmit: (data: z.infer<typeof accountInfoSchema>) => void;
  initialData?: Partial<z.infer<typeof accountInfoSchema>>;
}) {
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = (data: any) => {
    // Validate form data
    const validationResult = accountInfoSchema.safeParse(data);
    
    if (validationResult.success) {
      // Clear any previous errors
      setFormErrors([]);
      
      // Call onSubmit with validated data
      onSubmit(validationResult.data);
    } else {
      // Handle validation errors
      const errors = validationResult.error.issues.map((err) => err.message);
      setFormErrors(errors);
    }
  };

  // Form configuration
  const formConfig = {
    email: {
      label: "Email",
      schema: z.string().email("Invalid email address"),
      control: <Input type="email" />,
      required: true,
    },
    first_name: {
      label: "First Name",
      schema: z.string().min(1, "First name is required"),
      control: <Input type="text" />,
      required: true,
    },
    last_name: {
      label: "Last Name",
      schema: z.string().min(1, "Last name is required"),
      control: <Input type="text" />,
      // required: true
    },
    password: {
      label: "Password",
      schema: z.string().min(6, "Input at least 6 characters"),
      control: <Input type="password" />,
      required: true,
    },
    confirm_password: {
      label: "Confirm Password",
      schema: z.string().min(6, "Input at least 6 characters"),
      control: <Input type="password" />,
      required: true,
    },
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-primary mb-4">
          Create Your Account
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Enter your personal details to get started. Your information is 
          secure and will only be used to personalize your experience.
        </p>
      </div>

      {/* Display form-level errors */}
      {formErrors.length > 0 && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <ul className="list-disc list-inside">
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Left Column - Account Details */}
        <div className="space-y-6">
          <Form 
            config={formConfig} 
            onSubmit={handleSubmit}
            className="space-y-4"
            initialValues={initialData}
          >
            <FormItem key="email" className="mb-4" />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormItem key="first_name" />
              <FormItem key="last_name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormItem key="password" />
              <FormItem key="confirm_password" />
            </div>
            <button type="submit" className="hidden" />
          </Form>
        </div>

        {/* Vertical Separator */}
        <div 
          className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 
          hidden md:block w-px bg-gray-200"
        />

        {/* Right Column - Social Registration */}
        <div className="flex flex-col justify-center">
          <p className="text-muted-foreground mb-6 text-center">
            Continue with your preferred social account
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {socialLogins.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                className={`
                  flex items-center justify-center 
                  text-white ${social.color} 
                  hover:opacity-90 border-none
                `}
              >
                {social.icon}
                <span className="ml-2">{social.name}</span>
              </Button>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              By using social registration, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
