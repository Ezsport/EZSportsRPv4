import React, { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CheckIcon, XIcon } from "lucide-react";
import { Button, Buttons } from "@/components/controls/button";

interface PopoverConfirmProps {
  children: ReactNode;
  question: string;
  onYes: () => void;
  onCancel?: () => void;
  yesText?: string;
  cancelText?: string;
  className?: string;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export function PopoverConfirm({
  children,
  question = "Are you sure?",
  onYes,
  onCancel,
  yesText = "Yes",
  cancelText = "Cancel",
  className = "",
  align = "center",
  side = "bottom",
}: PopoverConfirmProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto">
        <div className="font-medium">
          {question}
          <XIcon
            className="h-4 w-4 absolute top-4 right-4 cursor-pointer text-muted-foreground"
            onClick={onCancel}
          />
        </div>

        <div className="flex items-center justify-center gap-2 mt-2">
          <Buttons.Yes size="sm" onClick={onYes} />
          <Buttons.No icon="" size="sm" variant="outline" onClick={onCancel} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
