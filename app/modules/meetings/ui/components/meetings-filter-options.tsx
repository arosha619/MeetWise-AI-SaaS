"use client";

import { FilterIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";

const STATUS_LABELS: Record<string, string> = {
  all: "All statuses",
  upcoming: "Upcoming",
  active: "Active",
  completed: "Completed",
  processing: "Processing",
  cancelled: "Cancelled",
};

export const MeetingsFilterOptions = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <Select
      value={filters.status}
      onValueChange={(value) =>
        setFilters({ status: value as typeof filters.status, page: 1 })
      }
    >
      <SelectTrigger className="w-[180px]">
        <FilterIcon className="mr-2 size-4 text-muted-foreground" />
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
