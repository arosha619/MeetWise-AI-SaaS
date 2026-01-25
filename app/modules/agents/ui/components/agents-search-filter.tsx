"use client";

import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAgentsFilters } from "../../hooks/use-agents-filter";

export const AgentsSearchFilter = () => {
    const [filters, setFilters] = useAgentsFilters();
  return (
    <div className="flex w-full items-center gap-3">
      <InputGroup className="w-full max-w-md">
        <InputGroupAddon>
          <SearchIcon className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search agents..." aria-label="Search agents" value={filters.search} onChange={(e) => setFilters({ search: e.target.value })} />
      </InputGroup>
    </div>
  );
};
