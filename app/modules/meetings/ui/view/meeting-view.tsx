"use client";

import { ErrorState } from "@/components/error";
import { LoadingState } from "@/components/loading-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filter";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView = () => {
  const trpc = useTRPC();
  const [filters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(
    trpc.meeting.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8">
      {JSON.stringify(data)}
      <h1>Meeting View</h1>
    </div>
  );
};

export const MeetingViewLoading = () => {
    return <LoadingState title="Meetings Loading..." />;
};

export const MeetingViewError = () => {
    return <ErrorState title="Error loading Meetings." />;
};