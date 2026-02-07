"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingListItem } from "../../types";
import { Badge } from "@/components/ui/badge";

const formatDate = (value: unknown) => {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const statusVariant = (
  status: string
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "active":
      return "default";
    case "completed":
      return "secondary";
    case "cancelled":
      return "destructive";
    case "processing":
      return "outline";
    default:
      return "outline";
  }
};

export const columns: ColumnDef<MeetingListItem>[] = [
  {
    accessorKey: "name",
    header: "Meeting",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue("status") as string) ?? "upcoming";
      return (
        <Badge variant={statusVariant(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "agentName",
    header: "Agent",
    cell: ({ row }) => (
      <span className="block max-w-[200px] truncate text-sm text-muted-foreground">
        {(row.getValue("agentName") as string | null) ?? row.original.agentId}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.getValue("createdAt"))}
      </span>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.getValue("updatedAt"))}
      </span>
    ),
  },
];
