"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoveVertical as MoveVerticalIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  User as UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  GripVertical, // New icon for dragging
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { PopoverConfirm } from "../popovers/popover-confirm";
import { TypeReorder } from "@/types/types";

// Define core types
export type TableRowData = {
  id: string | number;
  [key: string]: any;
};

type TableCellRenderer<T extends TableRowData> =
  | ((row: T, index?: number) => React.ReactNode)
  | ((row: T) => React.ReactNode)
  | React.ReactNode;

interface TableProps<T extends TableRowData> {
  cols: {
    accessor: keyof T;
    header: string;
    cell?: TableCellRenderer<T>;
  }[];
  data: T[];
  selectable?: boolean;
  draggable?: boolean;
  onRowActionEdit?: (id: string | number) => void;
  onRowActionDelete?: (id: string | number) => void;
  onRowDoubleClick?: (id: string | number) => void;
  onReorder?: (newOrders: TypeReorder[], newData?: any) => void;
  showCheckboxColumn?: boolean;
  showReorderColumn?: boolean;
  rowsPerPage?: number;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  loading?: boolean;
  onRowSelect?: (selectedRows: (string | number)[]) => void;
  // New prop to allow external control of selected rows
  selectedRows?: (string | number)[];
  noDataMessage?: string;
}

export default function Table<T extends TableRowData>({
  cols,
  data,
  selectable = true,
  draggable = true,
  onRowActionEdit,
  onRowActionDelete,
  onRowDoubleClick,
  onReorder,
  showCheckboxColumn = selectable,
  showReorderColumn = draggable,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  onRowSelect,
  selectedRows: propSelectedRows,
  noDataMessage = "No data",
}: TableProps<T>) {
  // Use prop if provided, otherwise use internal state
  const [internalSelectedRows, setInternalSelectedRows] = useState<
    (string | number)[]
  >([]);
  const selectedRows = propSelectedRows ?? internalSelectedRows;

  // Trigger onRowSelect when selectedRows changes
  React.useEffect(() => {
    onRowSelect?.(selectedRows);
  }, [selectedRows, onRowSelect]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(rowsPerPage || 10);

  // Pagination logic
  const paginatedData = React.useMemo(() => {
    if (!currentRowsPerPage) return data;
    const startIndex = (currentPage - 1) * currentRowsPerPage;
    return data.slice(startIndex, startIndex + currentRowsPerPage);
  }, [data, currentPage, currentRowsPerPage]);

  const totalPages = React.useMemo(
    () =>
      currentRowsPerPage ? Math.ceil(data.length / currentRowsPerPage) : 1,
    [data.length, currentRowsPerPage]
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    const parsedRowsPerPage = Number(newRowsPerPage);

    // Reset to first page if rows per page changes
    setCurrentPage(1);
    setCurrentRowsPerPage(parsedRowsPerPage);

    // Call the optional callback
    onRowsPerPageChange?.(parsedRowsPerPage);
  };

  // Generate page numbers
  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = [1];

    if (totalPages > 5) {
      if (currentPage > 3) pages.push("ellipsis");

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    } else {
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const toggleRowSelection = (id: string | number) => {
    // If external selectedRows is not provided, use internal state
    if (!propSelectedRows) {
      setInternalSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    } else {
      // If external selectedRows is provided, call onRowSelect with updated selection
      const newSelectedRows = selectedRows.includes(id)
        ? selectedRows.filter((rowId) => rowId !== id)
        : [...selectedRows, id];
      onRowSelect?.(newSelectedRows);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    // If external selectedRows is not provided, use internal state
    if (!propSelectedRows) {
      if (checked) {
        setInternalSelectedRows(data.map((row) => row.id));
      } else {
        setInternalSelectedRows([]);
      }
    } else {
      // If external selectedRows is provided, call onRowSelect with all/no rows
      const newSelectedRows = checked ? data.map((row) => row.id) : [];
      onRowSelect?.(newSelectedRows);
    }
  };

  const handleDragStart = (
    index: number,
    e: React.DragEvent<HTMLDivElement>,
    row?: T
  ) => {
    try {
      if (!draggable) {
        console.warn("Drag disabled");
        return;
      }

      // Validate index against full data array
      if (index < 0 || index >= data.length) {
        console.error(
          `Invalid drag start index: ${index}, data length: ${data.length}`
        );
        return;
      }

      // Ensure the row exists and has an id
      const draggedRow = data[index];
      if (!draggedRow) {
        console.error(`No row found at index: ${index}`);
        return;
      }

      // Set the dragged item's index
      setDraggedIndex(index);

      // Allow dragging
      if (e.dataTransfer) {
        e.dataTransfer.setData("text/plain", String(index));
        e.dataTransfer.effectAllowed = "move";
      } else {
        console.error("DataTransfer is not available");
      }
    } catch (error) {
      console.error("Error in handleDragStart:", error);
    }
  };

  const handleDragOver = (
    index: number,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    try {
      if (!draggable) {
        console.warn("Drag disabled");
        return;
      }

      // Validate index against full data array
      if (index < 0 || index >= data.length) {
        console.error(
          `Invalid drag over index: ${index}, data length: ${data.length}`
        );
        return;
      }

      // Prevent default to allow drop
      e.preventDefault();
      e.stopPropagation();

      // Update the hover index
      setDragOverIndex(index);
    } catch (error) {
      console.error("Error in handleDragOver:", error);
    }
  };

  const handleDragLeave = () => {
    if (!draggable) return;

    // Reset hover state
    setDragOverIndex(null);
  };

  const handleDrop = (
    dropIndex: number,
    e: React.DragEvent<HTMLDivElement>
  ) => {
    try {
      if (!draggable) {
        console.warn("Drag disabled");
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // Validate drop index against full data array
      if (dropIndex < 0 || dropIndex >= data.length) {
        console.error(
          `Invalid drop index: ${dropIndex}, data length: ${data.length}`
        );
        return;
      }

      // Retrieve the original dragged index
      const draggedIndexStr = e.dataTransfer?.getData("text/plain");
      const draggedIndex = draggedIndexStr
        ? Number(draggedIndexStr)
        : undefined;

      // Validate dragged index
      if (
        draggedIndex === undefined ||
        draggedIndex < 0 ||
        draggedIndex >= data.length
      ) {
        console.error(
          `Invalid dragged index: ${draggedIndex}, data length: ${data.length}`
        );
        return;
      }

      // Ensure not dropping on same position
      if (draggedIndex === dropIndex) {
        console.warn("Dropped on same position");
        return;
      }

      // Create a copy of the data to modify
      const updatedData = [...data];

      // Remove the dragged item from its original position
      const [reorderedItem] = updatedData.splice(draggedIndex, 1);

      // Insert the item at the new position
      updatedData.splice(dropIndex, 0, reorderedItem);

      // Create order configuration
      const orderConfig = updatedData.map((item, index) => ({
        [String(item.id)]: index + 1,
      }));

      // Call onReorder if provided
      if (onReorder) {
        try {
          onReorder(orderConfig, updatedData);
        } catch (reorderError) {
          console.error("Error in onReorder callback:", reorderError);
        }
      }

      // Reset drag states
      setDraggedIndex(null);
      setDragOverIndex(null);
    } catch (error) {
      console.error("Error in handleDrop:", error);
    }
  };

  // Helper function to get cell value
  const getCellValue = (
    row: T,
    col: { accessor: keyof T; header?: string; cell?: TableCellRenderer<T> },
    index?: number
  ) => {
    // If custom cell renderer exists, use it
    if (col.cell) {
      if (typeof col.cell === "function") {
        // Check if the renderer expects an index
        if (col.cell.length > 1 && index !== undefined) {
          return col.cell(row, index);
        }
        return col.cell(row);
      }
      return col.cell;
    }

    // Otherwise, get value from row
    const value = row[col.accessor];

    // Handle different types of values
    if (value === undefined || value === null) return "-";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value);

    return String(value);
  };

  // Prepare columns with optional checkbox and reorder columns
  const preparedColumns = [
    ...(showCheckboxColumn && selectable
      ? [
          {
            accessor: "checkbox" as keyof T,
            header: "",
            cell: (row: T, index?: number) => (
              <Checkbox
                data-column="checkbox"
                checked={selectedRows.includes(row.id)}
                onCheckedChange={() => toggleRowSelection(row.id)}
              />
            ),
          },
        ]
      : []),
    ...(showReorderColumn && draggable
      ? [
          {
            accessor: "reorder" as keyof T,
            header: "",
            cell: (row: T, index?: number) => {
              // Find the index in the full data array
              const fullDataIndex = data.findIndex(
                (dataRow) => dataRow.id === row.id
              );

              return (
                <div
                  data-column="reorder"
                  className="cursor-move flex items-center justify-center"
                >
                  <div
                    draggable
                    onDragStart={(e) => {
                      // Only start drag from this specific div
                      handleDragStart(fullDataIndex, e, row);
                    }}
                    className="cursor-move"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              );
            },
          },
        ]
      : []),
    ...cols,
  ];

  const handleRowDoubleClick = (row: T) => {
    if (onRowDoubleClick && row.id) {
      onRowDoubleClick(row.id);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <ShadcnTable className="border-1">
            <TableHeader className="bg-primary">
              <TableRow className="hover:bg-primary">
                {preparedColumns.map((col) => (
                  <TableHead
                    key={String(col.accessor)}
                    className={
                      col.accessor === "checkbox" || col.accessor === "reorder"
                        ? "w-[50px] text-center text-white"
                        : "text-white"
                    }
                  >
                    {col.accessor === "checkbox" && selectable ? (
                      <Checkbox
                        checked={
                          paginatedData.length > 0 &&
                          paginatedData.every((row) =>
                            selectedRows.includes(row.id)
                          )
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    ) : (
                      col.header
                    )}
                  </TableHead>
                ))}
                {onRowActionEdit || onRowActionDelete ? (
                  <TableHead className="text-center text-white w-[100px]">
                    Actions
                  </TableHead>
                ) : null}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={preparedColumns.length + (onRowActionEdit || onRowActionDelete ? 1 : 0)} className="text-center text-muted-foreground py-8">
                    {noDataMessage}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, index) => (
                  <TableRow
                    key={row.id ?? index}
                    className={`
                      ${selectedRows.includes(row.id) ? "bg-primary/10" : ""}
                      ${
                        draggedIndex !== null && dragOverIndex === index
                          ? "bg-red-400/10"
                          : ""
                      }
                      hover:bg-muted/20
                    `}
                    draggable={false}
                    onDragOver={(e) => {
                      if (draggedIndex !== null) {
                        e.preventDefault();
                        handleDragOver(index, e);
                      }
                    }}
                    onDrop={(e) => {
                      if (draggedIndex !== null) {
                        handleDrop(index, e);
                      }
                    }}
                    onClick={() => selectable && toggleRowSelection(row.id)}
                    onDoubleClick={() => handleRowDoubleClick(row)}
                  >
                    {preparedColumns.map((col) => {
                      let cellContent;
                      if (col.cell) {
                        if (typeof col.cell === "function") {
                          // If it's a function, call it with row and optional index
                          if (
                            col.accessor === "checkbox" ||
                            col.accessor === "reorder"
                          ) {
                            cellContent = col.cell(row);
                          } else {
                            // Explicit type handling
                            const cellRenderer = col.cell as
                              | ((row: T, index?: number) => React.ReactNode)
                              | ((row: T) => React.ReactNode);

                            // Check if the renderer expects an index
                            if (cellRenderer.length > 1) {
                              cellContent = cellRenderer(row, index);
                            } else {
                              cellContent = cellRenderer(row);
                            }
                          }
                        } else {
                          // If it's a ReactNode, use it directly
                          cellContent = col.cell;
                        }
                      } else {
                        // If no cell renderer, use default getCellValue
                        cellContent = getCellValue(row, col, index);
                      }

                      return (
                        <TableCell
                          key={String(col.accessor)}
                          className={
                            col.accessor === "checkbox" ||
                            col.accessor === "reorder"
                              ? "w-[50px] text-center"
                              : ""
                          }
                          onClick={(e) => {
                            if (col.accessor === "checkbox") {
                              e.stopPropagation();
                            }
                          }}
                        >
                          {cellContent}
                        </TableCell>
                      );
                    })}
                    {onRowActionEdit || onRowActionDelete ? (
                      <TableCell className="text-center" data-column="actions">
                        <div className="flex justify-center ">
                          {onRowActionEdit && (
                            <Button
                              variant="link"
                              size="sm"
                              className="cursor-pointer text-primary/70 hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRowActionEdit?.(row.id);
                              }}
                            >
                              <EditIcon className="h-4 w-4" />
                            </Button>
                          )}
                          {onRowActionDelete && (
                            <PopoverConfirm
                              question="Are you sure?"
                              onYes={() => onRowActionDelete?.(row.id)}
                            >
                              <Button
                                variant="link"
                                size="sm"
                                className="cursor-pointer text-red-500/70 hover:text-red-500"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </PopoverConfirm>
                          )}
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              )}
            </TableBody>
          </ShadcnTable>

          {data.length > 0 && currentRowsPerPage && (
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-2">
                {selectable && (
                  <span className="text-sm text-muted-foreground w-32">
                    Selected {selectedRows.length} rows
                  </span>
                )}
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronsLeftIcon className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  {generatePageNumbers().map((page, index) =>
                    page === "ellipsis" ? (
                      <PaginationEllipsis key={`ellipsis-${index}`} />
                    ) : (
                      <PaginationItem key={page}>
                        <Button
                          variant={currentPage === page ? "outline" : "ghost"}
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </PaginationItem>

                  <PaginationItem>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronsRightIcon className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="flex items-center space-x-2">
                <Select
                  data={[
                    { id: 5, name: "5" },
                    { id: 10, name: "10" },
                    { id: 20, name: "20" },
                    { id: 50, name: "50" },
                    { id: 100, name: "100" },
                  ]}
                  value={currentRowsPerPage}
                  onChange={(value) => handleRowsPerPageChange(Number(value))}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
