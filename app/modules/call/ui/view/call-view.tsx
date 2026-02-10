"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
    meetingId: string;
}

const CallView = ({ meetingId }: Props) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meeting.getOne.queryOptions({ id: meetingId }));
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
export default CallView;