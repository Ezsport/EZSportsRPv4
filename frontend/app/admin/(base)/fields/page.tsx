"use client";

import * as React from "react";
import { FileIcon, SearchIcon } from "lucide-react";
import Image from "next/image";

import { Card } from "@/components/controls/card";
import { Buttons } from "@/components/controls/button";
import Table from "@/components/controls/table";
import { Toolbar } from "@/components/controls/toolbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ServiceField } from "@/lib/services/service-field";
import { TypeField, TypeReorder, TypeSport } from "@/types/types";
import FieldEditModal from "@/components/modals/modal-field-edit";
import { getSectionIcon } from "@/lib/utils";
import { useSports } from "@/hooks/useSports";
import { useCountries } from "@/hooks/useCountries";

export default function FieldsPage() {
  const { sports } = useSports();
  const { countries } = useCountries();
  const [entries, setEntries] = React.useState([]);
  const [entry, setEntry] = React.useState<TypeField | null>(null);
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
      const fields = await ServiceField.getFields();
      // Convert fields to table rows with numeric id
      const tableRows = fields.map((field) => ({
        ...field,
        id: field.id ?? Math.floor(Math.random() * 10000),
      }));
      setEntries(tableRows);
    } catch (error) {
      console.error("Failed to load fields:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredFields = entries.filter(
    (field) =>
      field.name.toLowerCase().includes(keyword.toLowerCase()) ||
      field.abbr?.toLowerCase().includes(keyword.toLowerCase()) ||
      field.note?.toLowerCase().includes(keyword.toLowerCase()) ||
      false
  );

  const handleAdd = () => {
    setEntry(null);
    setEditing(true);
  };

  const handleEdit = (id: string | number) => {
    const field = entries.find((f) => f.id === Number(id));
    setEntry(field || null);
    setEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Convert id to number for service call
      setLoading(true);
      await ServiceField.deleteField(Number(id));
      setEntries(entries.filter((field) => field.id !== Number(id)));
    } catch (error) {
      console.error("Failed to delete field:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    ServiceField.deleteFields(selectedRows.map(Number))
      .then(() => {
        setEntries(entries.filter((field) => !selectedRows.includes(field.id)));
        setSelectedRows([]);
      })
      .catch((error) => {
        console.error("Failed to delete selected fields:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = async (fieldData: TypeField) => {
    loadData();
    setEditing(false);
  };

  const handleReorder = (orders: TypeReorder[], data: TypeField[]) => {
    try {
      ServiceField.reorderFields(orders);
      setEntries(data);
    } catch (error) {
      console.error("Failed to reorder fields:", error);
    }
  };

  const cols: {
    accessor: keyof (TypeField & { id: number });
    header: string;
    cell?: (row: TypeField & { id: number }) => React.ReactNode;
  }[] = [
    {
      accessor: "name",
      header: "Field Name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={row.base64} className="size-10" />
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
      accessor: "countryId",
      header: "Country",
      cell: (row) => {
        if (!row.countryId) return "-";

        const country = countries.find((c) => c.id === row.countryId);

        return country ? (
          <div className="flex items-center space-x-2">
            <Avatar className="size-4 mr-1">
              <AvatarImage src={country.base64} />
              <AvatarFallback>{country.code}</AvatarFallback>
            </Avatar>
            <span>{country.abbr}</span>
          </div>
        ) : (
          "-"
        );
      },
    },
    {
      accessor: "sportIds",
      header: "Sports",
      cell: (row) => {
        if (!row.sportIds || row.sportIds.length === 0) return "-";

        const fieldSports = sports
          .filter((sport) => row.sportIds?.includes(sport.id))
          .map((sport) => (
            <div className="flex items-center space-x-2">
              <Avatar className="size-4 mr-1">
                <AvatarImage src={sport.base64} />
                <AvatarFallback>{sport.abbr}</AvatarFallback>
              </Avatar>
              {sport.abbr}
            </div>
          ));

        return (
          <div className="flex flex-wrap gap-1">
            {fieldSports.map((sportName) => (
              <Badge key={sportName} variant="secondary" className="text-xs">
                {sportName}
              </Badge>
            ))}
          </div>
        );
      },
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

  const SectionIcon = getSectionIcon("fields");

  return (
    <div className="p-6 space-y-6">
      <Card
        title="Fields Management"
        note="Manage and configure sports fields"
        icon={<SectionIcon className="w-6 h-6 text-primary" />}
      >
        <Toolbar
          start={
            <div className="flex items-center space-x-2 w-full max-w-md">
              <SearchIcon className="text-muted-foreground" />
              <Input
                placeholder="Search fields by name, code, or description..."
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
              <Buttons.Add onClick={handleAdd}>Add Field</Buttons.Add>
            </div>
          }
        />

        {/* Table */}
        <Table
          cols={cols}
          data={filteredFields}
          loading={loading}
          selectedRows={selectedRows}
          onReorder={handleReorder}
          onRowActionEdit={handleEdit}
          onRowActionDelete={handleDelete}
          onRowDoubleClick={handleEdit}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
        />
      </Card>

      {/* Modal for Adding/Editing Fields */}
      <FieldEditModal
        isOpen={editing}
        onOpenChange={setEditing}
        field={entry || undefined}
        onSave={handleSave}
      />
    </div>
  );
}
