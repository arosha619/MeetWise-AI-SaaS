"use client";
import { ErrorState } from "@/components/error";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CallProvider } from "../components/call-provider";

interface Props {
    meetingId: string;
}

const CallView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meeting.getOne.queryOptions({ id: meetingId }));

    if (data.status === "completed") {
        return <div><ErrorState title="Call completed" description="The call has already been completed" /></div>;
    }
    return (
       <CallProvider meetingId={meetingId} meetingName={data.name} />
    )
}
export default CallView;