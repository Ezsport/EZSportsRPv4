import * as React from "react";
import { cn } from "@/lib/utils";

// Main Toolbar Component Props
interface ToolbarProps {
  className?: string;
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
}

export function Toolbar({ className, start, center, end }: ToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full mb-2 bg-background space-x-4",
        className
      )}
    >
      {/* Start side content */}
      <div className="flex items-center space-x-2">{start}</div>

      {/* Center content */}
      {center && (
        <div className="flex items-center justify-center space-x-2">
          {center}
        </div>
      )}

      {/* End side content */}
      <div className="flex items-center space-x-2">{end}</div>
    </div>
  );
}

export default Toolbar;
