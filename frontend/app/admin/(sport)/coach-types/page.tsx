"use client";

import * as React from "react";
import { PlusIcon, SearchIcon, UserIcon } from "lucide-react";

import { Card } from "@/components/controls/card";
import { Buttons } from "@/components/controls/button";
import Table from "@/components/controls/table";
import { Toolbar } from "@/components/controls/toolbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/controls/avatar";
import { TypeReorder } from "@/types/types";
import { CoachType } from "@/lib/services/service-coach-type";
import { getSectionIcon } from "@/lib/utils";
import { ServiceCoachType } from "@/lib/services/service-coach-type";
import useSports from "@/hooks/useSports";
import { Select } from "@/components/ui/select";
import CoachTypeEditModal from "@/components/modals/modal-coach-type-edit";

export default function CoachTypesPage() {
  const [entries, setEntries] = React.useState<(CoachType & { id: number })[]>(
    []
  );
  const [entry, setEntry] = React.useState<CoachType | null>(null);
  const [keyword, setKeyword] = React.useState("");
  const [selectedSportId, setSelectedSportId] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState<(string | number)[]>(
    []
  );

  const { sports } = useSports();

  // Load initial data
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      const coachTypes = await ServiceCoachType.getAll();
      // Convert coach types to table rows with numeric id
      const tableRows = coachTypes.map(
        (coachType) =>
          ({
            ...coachType,
            id: coachType.id
              ? Number(coachType.id)
              : Math.floor(Math.random() * 10000),
          } as CoachType & { id: number })
      );
      setEntries(tableRows);
    } catch (error: unknown) {
      console.error("Failed to load coach types:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredCoachTypes = entries.filter(
    (coachType) =>
      coachType.name.toLowerCase().includes(keyword.toLowerCase()) ||
      coachType.description?.toLowerCase().includes(keyword.toLowerCase()) ||
      false
  );

  const handleAdd = () => {
    setEntry(null);
    setEditing(true);
  };

  const handleEdit = (id: string | number) => {
    const coachType = entries.find((s) => s.id === Number(id));
    setEntry(coachType || null);
    setEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Convert id to string for service call
      setLoading(true);
      await ServiceCoachType.delete(String(id));
      setEntries(entries.filter((coachType) => coachType.id !== Number(id)));
    } catch (error: unknown) {
      console.error("Failed to delete coach type:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedRows.map((id) => ServiceCoachType.delete(String(id)))
      );
      setEntries(
        entries.filter((coachType) => !selectedRows.includes(coachType.id))
      );
      setSelectedRows([]);
    } catch (error: unknown) {
      console.error("Failed to delete selected coach types:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (coachTypeData: CoachType) => {
    loadData();
    setEditing(false);
  };

  const cols: {
    accessor: keyof (CoachType & { id: number });
    header: string;
    cell?: (row: CoachType & { id: number }) => React.ReactNode;
  }[] = [
    {
      accessor: "name",
      header: "Coach Type Name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar src={row.base64} />
          <div className="font-medium">{row.name}</div>
        </div>
      ),
    },
    {
      accessor: "sportId",
      header: "Sport",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar src={row.sport?.base64} />
          <div className="font-medium">{row.sport?.name || "-"}</div>
        </div>
      ),
    },
  ];

  const SectionIcon = getSectionIcon("coach-types");

  return (
    <>
      <Card
        title="Coach Types Management"
        note="Manage and configure coach types in the system"
        icon={<SectionIcon className="w-6 h-6 text-primary" />}
      >
        {/* Toolbar */}
        <Toolbar
          start={
            <div className="flex items-center space-x-2 w-full">
              <Select
                data={sports}
                value={selectedSportId || ""}
                onChange={(value) => setSelectedSportId(value || null)}
                placeholder="Select Sport"
                allowClear
              />
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
              <Buttons.Add onClick={handleAdd}>Add Coach Type</Buttons.Add>
            </div>
          }
        />

        {/* Table */}
        <Table
          cols={cols}
          data={filteredCoachTypes}
          loading={loading}
          onRowActionEdit={handleEdit}
          onRowActionDelete={handleDelete}
          onRowDoubleClick={handleEdit}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </Card>

      {/* Modal for Adding/Editing Coach Types */}
      <CoachTypeEditModal
        isOpen={editing}
        onOpenChange={setEditing}
        coachType={entry || undefined}
        onSave={handleSave}
      />
    </>
  );
}
