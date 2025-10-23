import * as React from "react";
import { z } from "zod";
import { Modal } from "@/components/controls/modal";
import { Buttons } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AvatarPicker from "@/components/pickers/picker-avatar";
import { Form, FormItem } from "@/components/controls/form";
import { Separator } from "@/components/ui/separator";
import { TypeOrgTeam } from "@/types/types";
import ServiceTeam from "@/lib/services/service-team";
import ServiceClub from "@/lib/services/service-club";
import ServiceSport from "@/lib/services/service-sport";
import ComboClubs from "@/components/combos/combo-clubs";
import ComboSports from "@/components/combos/combo-sports";

type ModalTeamEditProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  team?: TypeOrgTeam;
  onSave: (teamData: TypeOrgTeam) => void;
  directSave?: boolean;
};

const ModalTeamEdit: React.FC<ModalTeamEditProps> = ({
  isOpen,
  onOpenChange,
  directSave = false,
  team,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const [clubs, setClubs] = React.useState<any[]>([]);
  const [sports, setSports] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Fetch clubs and sports for dropdowns
    ServiceClub.getAll().then(setClubs);
    ServiceSport.getSports().then(setSports);
  }, []);

  const formConfig = {
    base64: {
      label: "Team Logo",
      schema: z.union([z.string(), z.null(), z.undefined()]).optional(),
      control: <AvatarPicker image={team?.base64} />,
      className: "flex flex-col",
      required: false,
    },
    name: {
      label: "Team Name",
      schema: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),
      control: <Input />,
      required: true,
    },
    sportId: {
      label: "Sport",
      schema: z.string().min(1, "Sport is required"),
      control: <ComboSports />,
      required: true,
    },
    clubId: {
      label: "Club",
      schema: z.string().min(1, "Club is required"),
      control: <ComboClubs />,
      required: true,
    },
    maxPlayers: {
      label: "Max Players",
      schema: z
        .number()
        .min(1, "Must have at least 1 player")
        .max(50, "Cannot exceed 50 players")
        .optional(),
      control: <Input type="number" max={50} min={1} />,
      description: "Max number of players (1-50)",
    },
    note: {
      label: "Description",
      schema: z
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
      control: <Textarea rows={3} />,
    },
    isActive: {
      label: "Active",
      schema: z.boolean(),
      control: <Switch />,
    },
  };

  const triggerFormSubmit = React.useCallback(() => {
    if (formRef.current) {
      try {
        const submitEvent = new Event("submit", { cancelable: true });
        formRef.current.dispatchEvent(submitEvent);

        if (formRef.current.requestSubmit) {
          formRef.current.requestSubmit();
        }
      } catch (error) {
        // Silently handle any submission errors
      }
    }
  }, [formRef, team]);

  const handleSubmit = React.useCallback(
    (data: any) => {
      data.isActive = data.isActive;
      data.clubId = String(data.clubId);
      data.sportId = String(data.sportId);

      if (directSave) {
        if (team?.id) {
          ServiceTeam.update(team.id, data).then(() => {
            onSave({ ...team, ...data });
            onOpenChange(false);
          });
        } else {
          ServiceTeam.create(data).then((newTeam) => {
            onSave(newTeam);
            onOpenChange(false);
          });
        }
      } else {
        onSave(data);
        onOpenChange(false);
      }
    },
    [team, onSave, onOpenChange]
  );

  return (
    <Modal
      size="md"
      open={isOpen}
      onOpenChange={onOpenChange}
      title={team?.id ? "Edit Team" : "Add New Team"}
      description={
        team?.id
          ? "Update the details of the existing team"
          : "Create a new team in the system"
      }
    >
      <Form
        ref={formRef}
        config={formConfig}
        onSubmit={handleSubmit}
        className="flex gap-4"
        initialValues={team}
      >
        <FormItem key="base64" className="w-[120px]" />
        <Separator orientation="vertical" />
        <div className="space-y-4 w-full">
          <FormItem key="name" />
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="sportId" />
            <FormItem key="clubId" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="maxPlayers" />
            <FormItem key="isActive" />
          </div>
          <FormItem key="note" />
        </div>
      </Form>

      <Separator />
      {/* Footer with centered buttons */}
      <div className="flex justify-center space-x-2">
        <Buttons.Save onClick={triggerFormSubmit} />
        <Buttons.Cancel onClick={() => onOpenChange(false)} />
      </div>
    </Modal>
  );
};

export default ModalTeamEdit;
