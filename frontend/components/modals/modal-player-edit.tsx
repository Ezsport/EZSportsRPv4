import * as React from "react";
import { z } from "zod";
import { Modal } from "@/components/controls/modal";
import { Buttons } from "@/components/controls/button";
import { Input } from "@/components/ui/input";
import AvatarPicker from "@/components/pickers/picker-avatar";
import { Form, FormItem } from "@/components/controls/form";
import { Separator } from "@/components/ui/separator";
import { ServicePlayer } from "@/lib/services/service-player";
import ComboPlayerPositions from "../combos/combo-player-positions";
import { components } from "@/types/api-types";
import { Avatar } from "../controls/avatar";

type ModalPlayerEditProps = {
  team: components["schemas"]["OrgTeamDto"];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  player?: components["schemas"]["MemberPlayerDto"];
  onSave: (playerData: components["schemas"]["MemberPlayerDto"]) => void;
  directSave?: boolean;
};

const ModalPlayerEdit: React.FC<ModalPlayerEditProps> = ({
  team,
  isOpen,
  onOpenChange,
  directSave = false,
  player,
  onSave,
}) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const formConfig = {
    base64: {
      label: "Player Photo",
      schema: z.union([z.string(), z.null(), z.undefined()]).optional(),
      control: <AvatarPicker image={player?.base64} />,
      className: "flex flex-col",
      required: false,
    },
    email: {
      label: "Email",
      schema: z.string().email("Invalid email address").optional(),
      control: <Input type="email" />,
    },
    firstName: {
      label: "First Name",
      schema: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters"),
      control: <Input />,
      required: true,
    },
    lastName: {
      label: "Last Name",
      schema: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters"),
      control: <Input />,
      required: true,
    },
    position: {
      label: "Position",
      schema: z.string().optional(),
      control: <ComboPlayerPositions />,
    },
    jerseyNumber: {
      label: "Jersey Number",
      schema: z
        .string()
        .max(10, "Jersey number cannot exceed 10 characters")
        .optional(),
      control: <Input />,
    },
    dateOfBirth: {
      label: "Date of Birth",
      schema: z.coerce.date().optional(),
      control: <Input type="date" />,
    },
    nationality: {
      label: "Nationality",
      schema: z
        .string()
        .max(50, "Nationality cannot exceed 50 characters")
        .optional(),
      control: <Input />,
    },
    height: {
      label: "Height (cm)",
      schema: z
        .union([z.number(), z.string()])
        .optional(),
      control: <Input type="number" min={100} max={250} />,
    },
    weight: {
      label: "Weight (kg)",
      schema: z
        .union([z.number(), z.string()])
        .optional(),
      control: <Input type="number" min={30} max={200} />,
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
  }, [formRef, player]);

  const handleSubmit = React.useCallback(
    (data: any) => {
      if (directSave) {
        if (player?.id) {
          ServicePlayer.update(player.id, data).then(() => {
            onSave({ ...player, ...data });
            onOpenChange(false);
          });
        } else {
          ServicePlayer.create(data).then((newPlayer) => {
            onSave(newPlayer);
            onOpenChange(false);
          });
        }
      } else {
        data.id = Date.now().toString();
        console.log(data);
        onSave(data);
        onOpenChange(false);
      }
    },
    [player, onSave, onOpenChange]
  );

  return (
    <Modal
      size="md"
      open={isOpen}
      onOpenChange={onOpenChange}
      title={player?.id ? "Edit Player" : "Add New Player"}
      description={
        player?.id
          ? "Update the details of the existing player"
          : "Create a new player in the system"
      }
    >
      <Form
        ref={formRef}
        config={formConfig}
        onSubmit={handleSubmit}
        className="flex gap-4"
        initialValues={player}
      >
        <FormItem key="base64" className="w-[120px]" />
        <Separator orientation="vertical" />
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="email" />
            <div className="text-sm text-gray-500 pt-4 flex items-center gap-2">
              <Avatar
                src={player?.base64}
                alt={player?.name}
                size="xs"
                fallbackText={player?.name}
              />
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="firstName" />
            <FormItem key="lastName" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="position" />
            <FormItem key="jerseyNumber" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="dateOfBirth" />
            <FormItem key="nationality" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormItem key="height" />
            <FormItem key="weight" />
          </div>
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
export default ModalPlayerEdit;
