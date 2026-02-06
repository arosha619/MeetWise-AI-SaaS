"use client";

import { ErrorState } from "@/components/error";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meeting.getMany.queryOptions({}));

    return (
        <div>
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