"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  showToggle?: boolean;
}

export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, inputClassName, showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn("relative", className)}>
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={inputClassName}
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);
