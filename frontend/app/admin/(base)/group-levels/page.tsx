"use client";

import * as React from "react";
import { PlusIcon, SearchIcon, StarIcon } from "lucide-react";

import { Card } from "@/components/controls/card";
import { Buttons } from "@/components/controls/button";
import Table from "@/components/controls/table";
import { Toolbar } from "@/components/controls/toolbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TypeGroupLevel, TypeReorder } from "@/types/types";
import { getSectionIcon } from "@/lib/utils";
import ServiceGroupLevel from "@/lib/services/service-group-level";
import GroupLevelEditModal from "@/components/modals/modal-group-level-edit";

type GroupLevelTableRow = TypeGroupLevel & { id: number };

export default function GroupLevelsPage() {
  const [entries, setEntries] = React.useState<GroupLevelTableRow[]>([]);
  const [entry, setEntry] = React.useState<TypeGroupLevel | null>(null);
  const [keyword, setKeyword] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState<(string | number)[]>([]);

  // Load initial data
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      const groupLevels = await ServiceGroupLevel.getGroupLevels();
      // Convert group levels to table rows with numeric id
      const tableRows: GroupLevelTableRow[] = groupLevels.map((groupLevel) => ({
        ...groupLevel,
        id: groupLevel.id ?? Math.floor(Math.random() * 10000),
      }));
      setEntries(tableRows);
    } catch (error: unknown) {
      console.error("Failed to load group levels:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredGroupLevels = entries.filter(
    (groupLevel) =>
      groupLevel.name.toLowerCase().includes(keyword.toLowerCase()) ||
      groupLevel.description?.toLowerCase().includes(keyword.toLowerCase()) ||
      groupLevel.abbr?.toLowerCase().includes(keyword.toLowerCase()) ||
      false
  );

  const handleAdd = () => {
    setEntry(null);
    setEditing(true);
  };

  const handleEdit = (id: string | number) => {
    const groupLevel = entries.find((s) => s.id === Number(id));
    setEntry(groupLevel || null);
    setEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Convert id to number for service call
      setLoading(true);
      await ServiceGroupLevel.deleteGroupLevel(Number(id));
      setEntries(entries.filter((groupLevel) => groupLevel.id !== Number(id)));
    } catch (error: unknown) {
      console.error("Failed to delete group level:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    ServiceGroupLevel.deleteGroupLevels(selectedRows.map(Number))
      .then(() => {
        setEntries(entries.filter((groupLevel) => !selectedRows.includes(groupLevel.id)));
        setSelectedRows([]);
      })
      .catch((error: unknown) => {
        console.error("Failed to delete selected group levels:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = async (groupLevelData: TypeGroupLevel) => {
    loadData();
    setEditing(false);
  };

  const handleReorder = (orders: TypeReorder[], data: TypeGroupLevel[]) => {
    try {
      ServiceGroupLevel.reorderGroupLevels(orders);
      const tableRows: GroupLevelTableRow[] = data.map((groupLevel) => ({
        ...groupLevel,
        id: groupLevel.id ?? Math.floor(Math.random() * 10000),
      }));
      setEntries(tableRows);
    } catch (error: unknown) {
      console.error("Failed to reorder group levels:", error);
    }
  };

  const cols: {
    accessor: keyof (GroupLevelTableRow);
    header: string;
    cell?: (row: GroupLevelTableRow) => React.ReactNode;
  }[] = [
    {
      accessor: "name",
      header: "Group Level Name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="size-10">
            <AvatarFallback>{row.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-muted-foreground">{row.description}</div>
          </div>
        </div>
      ),
    },
    {
      accessor: "abbr",
      header: "Abbreviation",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.abbr || "-"}</div>
      ),
    },
    {
      accessor: "note",
      header: "Note",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.note || "-"}</div>
      ),
    },
    {
      accessor: "minAge",
      header: "Min Age",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.minAge ?? "-"}</div>
      ),
    },
    {
      accessor: "maxAge",
      header: "Max Age",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.maxAge ?? "-"}</div>
      ),
    },
    {
      accessor: "skillLevel",
      header: "Skill Level",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.skillLevel || "-"}</div>
      ),
    },
    {
      accessor: "ord",
      header: "Order",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.ord ?? "-"}</div>
      ),
    },
  ];

  const SectionIcon = getSectionIcon("group-levels");

  return (
    <>
      <Card
        title="Group Levels Management"
        note="Manage and configure group levels in the system"
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
              <Buttons.Add onClick={handleAdd}>Add Group Level</Buttons.Add>
            </div>
          }
        />

        {/* Table */}
        <Table
          cols={cols}
          data={filteredGroupLevels}
          loading={loading}
          onReorder={handleReorder}
          onRowActionEdit={handleEdit}
          onRowActionDelete={handleDelete}
          onRowDoubleClick={handleEdit}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </Card>

      {/* Modal for Adding/Editing Group Levels */}
      <GroupLevelEditModal
        isOpen={editing}
        onOpenChange={setEditing}
        groupLevel={entry || undefined}
        onSave={handleSave}
      />
    </>
  );
}
