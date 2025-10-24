import * as React from "react";
import { TypeGroupLevel } from "@/types/types";

interface GroupLevelEditModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  groupLevel?: TypeGroupLevel;
  onSave: (groupLevel: TypeGroupLevel) => void;
}

declare const GroupLevelEditModal: React.FC<GroupLevelEditModalProps>;

export default GroupLevelEditModal;
