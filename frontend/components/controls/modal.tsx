import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X as CloseIcon } from "lucide-react";

// Modal size types
type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

// Modal props interface
interface ModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  className?: string;
  onClose?: () => void;
  closeButton?: boolean;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
  onClose,
  closeButton = true,
}: ModalProps) {
  // Size mapping for modal width
  const sizeClasses = {
    xs: "!max-w-sm",
    sm: "!max-w-md",
    md: "!max-w-2xl",
    lg: "!max-w-4xl",
    xl: "!max-w-6xl",
    full: "!max-w-full",
  };

  // Handle modal close
  const handleClose = () => {
    onClose?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          // "sm:rounded-2xl",
          sizeClasses[size],
          // "default:max-w-none sm:max-w-none", // Force override of default max-width
          // "!max-w-2xl",
          className
        )}
      >
        {(title || description || closeButton) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        {children && <>{children}</>}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

// Predefined modal actions
export const ModalActions = {
  Confirm: ({
    onConfirm,
    onCancel,
    confirmText = "Confirm",
    cancelText = "Cancel",
  }: {
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => (
    <>
      <Button variant="outline" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button onClick={onConfirm}>{confirmText}</Button>
    </>
  ),
};

export default Modal;
