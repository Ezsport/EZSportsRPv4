"use client";

import * as React from "react";
import { TrophyIcon, SearchIcon } from "lucide-react";

import { Card } from "@/components/controls/card";
import { Buttons } from "@/components/controls/button";
import Table from "@/components/controls/table";
import { Toolbar } from "@/components/controls/toolbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeReorder } from "@/types/types";
import { getSectionIcon } from "@/lib/utils";
import ServiceCompetition from "@/lib/services/service-competition";
import CompetitionEditModal from "@/components/modals/modal-competition-edit";
import { components } from "@/types/api-types";

export default function CompetitionsPage() {
  const [entries, setEntries] = React.useState<(components["schemas"]["BaseCompetitionDto"] & { id: number })[]>(
    []
  );
  const [entry, setEntry] = React.useState<components["schemas"]["BaseCompetitionDto"] | null>(null);
  const [keyword, setKeyword] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState<(string | number)[]>(
    []
  );

  // Load initial data
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      const competitions = await ServiceCompetition.getCompetitions();
      // Convert competitions to table rows with numeric id
      const tableRows = competitions.map((competition) => ({
        ...competition,
        id: competition.id ?? Math.floor(Math.random() * 10000),
      }));
      setEntries(tableRows);
    } catch (error) {
      console.error("Failed to load competitions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredCompetitions = entries.filter(
    (competition) =>
      competition.name.toLowerCase().includes(keyword.toLowerCase()) ||
      competition.description?.toLowerCase().includes(keyword.toLowerCase()) ||
      false
  );

  const handleAdd = () => {
    setEntry(null);
    setEditing(true);
  };

  const handleEdit = (id: string | number) => {
    const competition = entries.find((s) => s.id === Number(id));
    setEntry(competition || null);
    setEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Convert id to number for service call
      setLoading(true);
      await ServiceCompetition.deleteCompetition(Number(id));
      setEntries(entries.filter((competition) => competition.id !== Number(id)));
    } catch (error) {
      console.error("Failed to delete competition:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    ServiceCompetition.deleteCompetitions(selectedRows.map(Number))
      .then(() => {
        setEntries(entries.filter((competition) => !selectedRows.includes(competition.id)));
        setSelectedRows([]);
      })
      .catch((error) => {
        console.error("Failed to delete selected competitions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = async (competitionData: components["schemas"]["BaseCompetitionDto"]) => {
    loadData();
    setEditing(false);
  };

  const handleReorder = (orders: TypeReorder[], data: components["schemas"]["BaseCompetitionDto"][]) => {
    try {
      ServiceCompetition.reorderCompetitions(orders);
      setEntries(data);
    } catch (error) {
      console.error("Failed to reorder competitions:", error);
    }
  };

  const cols: {
    accessor: keyof (components["schemas"]["BaseCompetitionDto"] & { id: number });
    header: string;
    cell?: (row: components["schemas"]["BaseCompetitionDto"] & { id: number }) => React.ReactNode;
  }[] = [
    {
      accessor: "name",
      header: "Competition Name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="size-10">
            <AvatarImage src={row.base64} />
            <AvatarFallback>{row.abbr || row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-muted-foreground">
              {row.abbr && `${row.abbr} | `}{row.note}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessor: "sportId",
      header: "Sport",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">
          {row.sportId ? `Sport ID: ${row.sportId}` : "-"}
        </div>
      ),
    },
    {
      accessor: "status",
      header: "Status",
      cell: (row) => (
        <Badge variant={row.status === 'active' ? "default" : "secondary"}>
          {row.status}
        </Badge>
      ),
    },
    {
      accessor: "startDate",
      header: "Dates",
      cell: (row) => {
        const start = row.startDate ? new Date(row.startDate).toLocaleDateString() : "-";
        const end = row.endDate ? new Date(row.endDate).toLocaleDateString() : "-";
        return (
          <div className="text-sm text-muted-foreground">
            {start} - {end}
          </div>
        );
      },
    },
  ];

  const SectionIcon = getSectionIcon("competitions");

  return (
    <>
      <Card
        title="Competitions Management"
        note="Manage and configure competitions in the system"
        icon={<SectionIcon className="w-6 h-6 text-primary" />}
      >
        {/* Toolbar */}
        <Toolbar
          start={
            <div className="flex items-center space-x-2 w-full max-w-md">
              <SearchIcon className="text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-grow"
              />
            </div>
          }
          end={
            <div className="flex items-center space-x-2">
              {selectedRows.length >= 2 && (
                <Buttons.DeleteConfirm
                  onYes={() => handleDeleteSelected()}
                  onNo={() => setSelectedRows([])}
                >
                  Delete All ({selectedRows.length})
                </Buttons.DeleteConfirm>
              )}
              <Buttons.Add onClick={handleAdd}>Add Competition</Buttons.Add>
            </div>
          }
        />

        {/* Table */}
        <Table
          cols={cols}
          data={filteredCompetitions}
          loading={loading}
          onReorder={handleReorder}
          onRowActionEdit={handleEdit}
          onRowActionDelete={handleDelete}
          onRowDoubleClick={handleEdit}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </Card>

      {/* Modal for Adding/Editing Competitions */}
      <CompetitionEditModal
        isOpen={editing}
        onOpenChange={setEditing}
        competition={entry || undefined}
        onSave={handleSave}
      />
    </>
  );
}
