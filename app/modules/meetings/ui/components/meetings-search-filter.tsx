"use client";

import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <div className="flex w-full items-center gap-3">
      <InputGroup className="w-full max-w-md">
        <InputGroupAddon>
          <SearchIcon className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search meetings..."
          aria-label="Search meetings"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
      </InputGroup>
    </div>
  );
};
