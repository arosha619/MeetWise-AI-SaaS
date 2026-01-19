"use client";

import { ErrorState } from "@/components/error";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agent.getMany.queryOptions()
  );

  if (isLoading) {
    return <LoadingState title="Loading Agents.." />;
  }
  if (isError) {
    return <ErrorState title="Failed to Load Agents"/>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
