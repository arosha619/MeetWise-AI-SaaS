"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agent.getMany.queryOptions()
  );

  if (isLoading) {
    return <LoadingState title="Loading Agents.."/>;
  }
  if (isError) {
    return <div>Error!</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
