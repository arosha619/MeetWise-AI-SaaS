"use client";

import { ErrorState } from "@/components/error";
import { EmptyAgentsIllustration, EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";



export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions({}));

  if (data.items.length === 0) {
    return (
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <EmptyState
          title="Create your first agent"
          description="Start by adding an agent with instructions for how it should behave."
          media={<EmptyAgentsIllustration />}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data.items} />
    </div>
  );
};

export const AgentsViewLoading = () => {
  return <LoadingState title="Agents Loading..." />;
};

export const AgentsViewError = () => {
  return <ErrorState title="Error loading agents." />;
};
