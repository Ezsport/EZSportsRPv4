import * as React from "react";
import { Button as ShadcnButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Plus as PlusIcon,
  Edit as EditIcon,
  Trash2 as TrashIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Save as SaveIcon,
  XIcon,
  CheckIcon,
} from "lucide-react";
import { PopoverConfirm } from "../popovers/popover-confirm";

// Extended button props
export interface ButtonProps extends React.ComponentProps<typeof ShadcnButton> {
  icon?: "add" | "edit" | "delete" | "download" | "upload" | React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}

// Icon mapping
const iconMap = {
  add: <PlusIcon className="h-4 w-4" />,
  edit: <EditIcon className="h-4 w-4" />,
  delete: <TrashIcon className="h-4 w-4" />,
  download: <DownloadIcon className="h-4 w-4" />,
  upload: <UploadIcon className="h-4 w-4" />,
};

export function Button({
  children,
  icon,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  // Determine the icon to use
  const buttonIcon = typeof icon === "string" ? iconMap[icon] : icon;

  return (
    <ShadcnButton
      className={cn(
        "flex items-center gap-2 cursor-pointer",
        loading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {buttonIcon && !loading && buttonIcon}
      {loading && (
        <span className="animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </span>
      )}
      {children}
    </ShadcnButton>
  );
}

// Predefined button types
export const Buttons = {
  Yes: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<CheckIcon />} {...props}>
      {props.children || "Yes"}
    </Button>
  ),
  No: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<XIcon />} {...props}>
      {props.children || "No"}
    </Button>
  ),
  Save: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<SaveIcon />} {...props}>
      {props.children || "Save"}
    </Button>
  ),
  Cancel: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<XIcon />} variant="outline" {...props}>
      {props.children || "Cancel"}
    </Button>
  ),
  Add: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon="add" {...props}>
      {props.children || "Add"}
    </Button>
  ),
  Edit: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<EditIcon />} {...props}>
      {props.children || "Edit"}
    </Button>
  ),
  Delete: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<TrashIcon />} {...props}>
      {props.children || "Delete"}
    </Button>
  ),
  Download: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<DownloadIcon />} {...props}>
      {props.children || "Download"}
    </Button>
  ),
  Upload: (props: Partial<ButtonProps> & { onClick?: () => void }) => (
    <Button icon={<UploadIcon />} {...props}>
      {props.children || "Upload"}
    </Button>
  ),
  DeleteConfirm: (
    props: Partial<ButtonProps> & { onYes?: () => void; onNo?: () => void }
  ) => (
    <PopoverConfirm
      question="Are you sure?"
      onYes={props.onYes ?? (() => {})}
      onCancel={props.onNo ?? (() => {})}
    >
      <Button
        icon={<TrashIcon />}
        variant="destructive"
        {...Object.fromEntries(
          Object.entries(props).filter(
            ([key]) => key !== "onYes" && key !== "onNo"
          )
        )}
      >
        {props.children || "Delete"}
      </Button>
    </PopoverConfirm>
  ),
};

export default Button;
