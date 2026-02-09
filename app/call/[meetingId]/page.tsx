import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ meetingId: string }>;
}

export const Page = async ({ params }: Props) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/auth/sign-in");
    }
    const { meetingId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.meeting.getOne.queryOptions({ id: meetingId }),
    );
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

        </HydrationBoundary>
    )
}