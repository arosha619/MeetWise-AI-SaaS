"use client";

import { ErrorState } from "@/components/error";
import { LoadingState } from "@/components/loading-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Agent } from "http";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agent.getMany.queryOptions());

  return (
    <div>
      
      {JSON.stringify(data, null, 2)}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return <LoadingState title="Agents Loading..." />;
};

export const AgentsViewError = () => {
  return <ErrorState title="Error loading agents." />;
};
