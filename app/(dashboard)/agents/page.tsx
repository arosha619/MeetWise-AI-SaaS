import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/app/modules/agents/ui/view/agent-view";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const agent = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agent.getMany.queryOptions());
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};
export default agent;
