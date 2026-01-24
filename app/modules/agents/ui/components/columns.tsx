"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentOne } from "../../types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


const formatDate = (value: unknown) => {
  if (!value) return "—"
  const date = value instanceof Date ? value : new Date(String(value))
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date)
}

export const columns: ColumnDef<AgentOne>[] = [
  {
    accessorKey: "name",
    header: "Agent",
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "instructions",
    header: "Instructions",
    cell: ({ row }) => (
      <span className="block max-w-[360px] truncate text-sm text-muted-foreground">
        {row.getValue("instructions")}
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
]