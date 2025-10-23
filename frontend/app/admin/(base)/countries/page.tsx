"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import { Card } from "@/components/controls/card";
import { Buttons } from "@/components/controls/button";
import Table from "@/components/controls/table";
import { Toolbar } from "@/components/controls/toolbar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountryEditModal from "@/components/modals/modal-country-edit";
import { TypeCountry, TypeReorder } from "@/types/types";
import { ServiceCountry } from "@/lib/services/service-country";
import { getSectionIcon } from "@/lib/utils";

export default function CountriesPage() {
  const [entries, setEntries] = React.useState<
    (TypeCountry & { id: number })[]
  >([]);
  const [entry, setEntry] = React.useState<TypeCountry | null>(null);
  const [keyword, setKeyword] = React.useState("");
  const [editing, setEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [selectedRows, setSelectedRows] = React.useState<(string | number)[]>(
    []
  );

  // Function to load initial data
  const loadData = React.useCallback(async () => {
    try {
      setLoading(true);
      const countries = await ServiceCountry.getCountries();
      // Convert countries to table rows with numeric id
      const tableRows = countries.map((country) => ({
        ...country,
        id: country.id ?? Math.floor(Math.random() * 10000),
      }));
      setEntries(tableRows);
    } catch (error) {
      console.error("Failed to load countries:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on component mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredCountries = entries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword.toLowerCase()) ||
      country.abbr?.toLowerCase().includes(keyword.toLowerCase()) ||
      country.note?.toLowerCase().includes(keyword.toLowerCase()) ||
      false
  );

  const handleAdd = () => {
    setEntry(null);
    setEditing(true);
  };

  const handleEdit = (id: string | number) => {
    const country = entries.find((c) => c.id === Number(id));
    setEntry(country || null);
    setEditing(true);
  };

  const handleDelete = async (id: string | number) => {
    try {
      // Convert id to number for service call
      setLoading(true);
      await ServiceCountry.deleteCountry(Number(id));
      setEntries(entries.filter((country) => country.id !== Number(id)));
    } catch (error) {
      console.error("Failed to delete country:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    ServiceCountry.deleteCountries(selectedRows.map(Number))
      .then(() => {
        setEntries(
          entries.filter((country) => !selectedRows.includes(country.id))
        );
        setSelectedRows([]);
      })
      .catch((error) => {
        console.error("Failed to delete selected countries:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSave = async (countryData: TypeCountry) => {
    loadData();
    setEditing(false);
  };

  const handleReorder = (newOrders: TypeReorder[], newData: TypeCountry[]) => {
    try {
      // if (!newData) return;
      ServiceCountry.reorderCountries(newOrders);
      setEntries(
        newData.map((country) => ({
          ...country,
          id: country.id ?? Math.floor(Math.random() * 10000),
        }))
      );
    } catch (error) {
      console.error("Failed to reorder countries:", error);
    }
  };

  const cols: {
    accessor: keyof (TypeCountry & { id: number });
    header: string;
    cell?: (row: TypeCountry & { id: number }) => React.ReactNode;
  }[] = [
    {
      accessor: "name",
      header: "Country Name",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={row.base64} className="size-10" />
            <AvatarFallback>{row.code}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-xs text-muted-foreground">{row.code}</div>
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

  const SectionIcon = getSectionIcon("countries");

  return (
    <div className="p-6 space-y-6">
      <Card
        title="Countries Management"
        note="Manage and configure countries in the system"
        icon={<SectionIcon className="w-6 h-6 text-primary" />}
      >
        {/* Toolbar */}
        <Toolbar
          start={
            <div className="flex items-center space-x-2 w-full max-w-md">
              <SearchIcon className="text-muted-foreground" />
              <Input
                placeholder="Search countries by name, code, or description..."
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
              <Buttons.Add onClick={handleAdd}>Add Country</Buttons.Add>
            </div>
          }
        />

        {/* Table */}
        <Table
          cols={cols}
          data={filteredCountries}
          loading={loading}
          onReorder={handleReorder}
          onRowActionEdit={handleEdit}
          onRowActionDelete={handleDelete}
          onRowDoubleClick={handleEdit}
          onRowSelect={(selectedRows) => setSelectedRows(selectedRows)}
          selectedRows={selectedRows}
        />
      </Card>

      {/* Modal for Adding/Editing Countries */}
      <CountryEditModal
        isOpen={editing}
        onOpenChange={setEditing}
        country={entry || undefined}
        onSave={handleSave}
      />
    </div>
  );
}
