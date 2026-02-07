import { MeetingListHeader } from "@/app/modules/meetings/ui/components/meeting-list-header";
import { MeetingView, MeetingViewError, MeetingViewLoading } from "@/app/modules/meetings/ui/view/meeting-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/app/modules/meetings/params";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

interface Props {
    searchParams: Promise<SearchParams>;
}

const MeetingsPage = async ({ searchParams }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }
    const filters = await loadSearchParams(searchParams);
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.meeting.getMany.queryOptions({ ...filters }));

    return (
        <>
            <Suspense
              fallback={
                <div className="mb-4">
                  <div className="flex items-center justify-between px-4 py-4 md:px-8">
                    <div className="h-8 w-32 animate-pulse rounded bg-muted/40" />
                    <div className="h-9 w-28 animate-pulse rounded bg-muted/40" />
                  </div>
                  <div className="flex gap-2 px-4 md:px-8">
                    <div className="h-9 max-w-md flex-1 animate-pulse rounded bg-muted/40" />
                    <div className="h-9 w-[180px] animate-pulse rounded bg-muted/40" />
                  </div>
                </div>
              }
            >
                <MeetingListHeader />
            </Suspense>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<MeetingViewLoading />}>
                    <ErrorBoundary fallback={<MeetingViewError />}>
                        <MeetingView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    );
};

export default MeetingsPage;