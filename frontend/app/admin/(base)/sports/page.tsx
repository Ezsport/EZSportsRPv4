"use client";

import * as React from "react";
import { PlusIcon, SearchIcon, TrophyIcon } from "lucide-react";

import { Card } from "@/components/controls/card";
import { Buttons } from "@/components/controls/button";
import Table from "@/components/controls/table";
import { Toolbar } from "@/components/controls/toolbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeSport, TypeReorder } from "@/types/types";
import SportEditModal from "@/components/modals/modal-sport-edit";
import { getSectionIcon } from "@/lib/utils";
import ServiceSport from "@/lib/services/service-sport";

export default function SportsPage() {
  const [entries, setEntries] = React.useState<(TypeSport & { id: number })[]>(
    []
  );
  const [entry, setEntry] = React.useState<TypeSport | null>(null);
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
      const sports = await ServiceSport.getSports();
      // Convert sports to table rows with numeric id
      const tableRows = sports.map((sport) => ({
        ...sport,
        id: sport.id ?? Math.floor(Math.random() * 10000),
      }));
      setEntries(tableRows);
    } catch (error) {
      console.error("Failed to load sports:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredSports = entries.filter(
    (sport) =>
      sport.name.toLowerCase().includes(keyword.toLowerCase()) ||
      sport.abbr?.toLowerCase().includes(keyword.toLowerCase()) ||
      sport.note?.toLowerCase().includes(keyword.toLowerCase()) ||
      false
  );

  const handleAdd = () => {
    setEntry(null);
    setEditing(true);
  };

  const handleEdit = (id: string | number) => {
    const sport = entries.find((s) => s.id === Number(id));
    setEntry(sport || null);
    setEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Convert id to number for service call
      setLoading(true);
      await ServiceSport.deleteSport(Number(id));
      setEntries(entries.filter((sport) => sport.id !== Number(id)));
    } catch (error) {
      console.error("Failed to delete sport:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    ServiceSport.deleteSports(selectedRows.map(Number))
      .then(() => {
        setEntries(entries.filter((sport) => !selectedRows.includes(sport.id)));
        setSelectedRows([]);
      })
      .catch((error) => {
        console.error("Failed to delete selected sports:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = async (sportData: TypeSport) => {
    loadData();
    setEditing(false);
  };

  const handleReorder = (orders: TypeReorder[], data: TypeSport[]) => {
    try {
      ServiceSport.reorderSports(orders);
      setEntries(data);
    } catch (error) {
      console.error("Failed to reorder sports:", error);
    }
  };

  const cols: {
    accessor: keyof (TypeSport & { id: number });
    header: string;
    cell?: (row: TypeSport & { id: number }) => React.ReactNode;
  }[] = [
    {
      accessor: "name",
      header: "Sport Name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="size-10">
            <AvatarImage src={row.base64} />
            <AvatarFallback>{row.abbr}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-muted-foreground">{row.abbr}</div>
          </div>
        </div>
      ),
    },
    {
      accessor: "note",
      header: "Description",
      cell: (row) => (
        <div className="text-sm text-muted-foreground">{row.note || "-"}</div>
      ),
    },
    {
      accessor: "isActive",
      header: "Status",
      cell: (row) => (
        <Badge variant={row.isActive ? "default" : "secondary"}>
          {row.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  const SectionIcon = getSectionIcon("sports");

  return (
    <div className="p-6 space-y-6">
      <Card
        title="Sports Management"
        note="Manage and configure sports in the system"
        icon={<SectionIcon className="w-6 h-6 text-primary" />}
      >
        {/* Toolbar */}
        <Toolbar
          start={
            <div className="flex items-center space-x-2 w-full max-w-md">
              <SearchIcon className="text-muted-foreground" />
              <Input
                placeholder="Search sports by name, code, or description..."
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
              <Buttons.Add onClick={handleAdd}>Add Sport</Buttons.Add>
            </div>
          }
        />

        {/* Table */}
        <Table
          cols={cols}
          data={filteredSports}
          loading={loading}
          onReorder={handleReorder}
          onRowActionEdit={handleEdit}
          onRowActionDelete={handleDelete}
          onRowDoubleClick={handleEdit}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </Card>

      {/* Modal for Adding/Editing Sports */}
      <SportEditModal
        isOpen={editing}
        onOpenChange={setEditing}
        sport={entry || undefined}
        onSave={handleSave}
      />
    </div>
  );
}
