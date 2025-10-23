"use client";

import React, { useState } from "react";
import { Button, Buttons } from "@/components/controls/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import Table from "../controls/table";
import { TypeOrgTeam } from "@/types/types";
import { components } from "@/types/api-types";
import ModalTeamEdit from "../modals/modal-team-edit";
import ModalPlayerEdit from "../modals/modal-player-edit";
import { Avatar } from "../controls/avatar";

interface TeamSetupPanelProps {
  sport: components["schemas"]["BaseSportDto"];
  club: components["schemas"]["OrgClubDto"];
  team: components["schemas"]["OrgTeamDto"];
  initialPlayers?: any[];
  onPlayersUpdate: (players: any[]) => void;
}

export default function PanelTeamSetup({
  sport,
  club,
  team,
  initialPlayers = [],
  onPlayersUpdate,
}: TeamSetupPanelProps) {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    position: "",
    age: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] =
    useState<components["schemas"]["MemberPlayerDto"]>();

  const handlePlayersUpdate = (updatedPlayers: any[]) => {
    onPlayersUpdate(updatedPlayers);
  };

  const deletePlayer = (playerId: string | number) => {
    const updatedPlayers = players.filter((p) => p.id !== playerId);
    setPlayers(updatedPlayers);
    handlePlayersUpdate(updatedPlayers);
  };

  const rows: any[] = players.map((player) => ({
    id: player.id,
    firstName: player.firstName,
    lastName: player.lastName,
    base64: player.base64,
    position: player.position,
    jersey: player.jerseyNumber,
    email: player.email,
  }));

  const cols = [
    {
      accessor: "base64",
      header: "Name",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Avatar src={row.base64} size="xs" fallbackText={row?.name} />
          {row?.firstName ?? ""} {row?.lastName ?? ""}
        </div>
      ),
    },
    {
      accessor: "position",
      header: "Position",
      cell: (row: any) => {
        console.log('row', row);
      },
    },
    { accessor: "jersey", header: "Jersey" },
    { accessor: "email", header: "Email" },
    {
      accessor: "actions",
      header: "Actions",
      cell: (row: any) => (
        <Buttons.DeleteConfirm
          onYes={() => deletePlayer(row.id)}
          children=" "
          size="sm"
          variant="link"
          className="cursor-pointer text-red-500 hover:text-red-700"
        />
      ),
    },
  ];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-primary mb-4">Team Setup</h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Add players to your team roster
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-2">
            <h4 className="text-lg font-semibold">Team Roster</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Avatar
                  src={sport?.base64}
                  alt={sport?.name}
                  size="xs"
                  fallbackText={sport?.abbr}
                />
                {sport?.abbr}
              </div>
              <div className="flex items-center gap-1">
                <Avatar
                  src={club?.base64}
                  alt={club?.name}
                  size="xs"
                  fallbackText={club?.abbr}
                />
                {club?.abbr}
              </div>
              <div className="flex items-center gap-1">
                <Avatar
                  src={team?.base64}
                  alt={team?.name}
                  size="xs"
                  fallbackText={team?.abbr}
                />
                {team?.name}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Player
          </Button>
        </div>

        <div className="p-4 pt-0">
          <Table
            cols={cols as any}
            data={rows}
            draggable={false}
            rowsPerPage={5}
            noDataMessage="No players found"
          />
        </div>
      </div>

      <ModalPlayerEdit
        team={team}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={(player) => {
          // Implement player save logic
          const updatedPlayers = [...players, player];
          setPlayers(updatedPlayers);
          handlePlayersUpdate(updatedPlayers);
        }}
      />
    </div>
  );
}
