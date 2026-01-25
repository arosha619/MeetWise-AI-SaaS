"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { useAgentsFilters } from "../../hooks/use-agents-filter";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

export const ListHeader = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [open, setOpen] = useState(false);
  const isAnyFilterApplied = !!filters.search;
  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };
  return (
    <>
      <NewAgentDialog open={open} onOpenChange={setOpen} />
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left side */}
        <h1 className="text-2xl font-semibold">My Agents</h1>

        {/* Right side */}
        <Button onClick={() => setOpen(true)}
          className="bg-linear-to-r from-indigo-600 to-sky-500 px-4 py-2 rounded text-white 
   transition-all duration-300"
        >
          <PlusIcon />
          New Agent
        </Button>
      </div>
      <div className="mb-4 px-4 md:px-8">
        <div className="flex items-center gap-2 max-w-md">
          <AgentsSearchFilter />
          {isAnyFilterApplied && (
            <Button variant="outline" size="icon" onClick={onClearFilters}>
              <XIcon className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
