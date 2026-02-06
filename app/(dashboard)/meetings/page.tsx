import { MeetingView, MeetingViewError, MeetingViewLoading } from "@/app/modules/meetings/ui/view/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MeetingsPage = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agent.getMany.queryOptions({}));

    return <>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingViewLoading />}>
                <ErrorBoundary fallback={<MeetingViewError />}>
                    <MeetingView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    </>;
};

export default MeetingsPage;