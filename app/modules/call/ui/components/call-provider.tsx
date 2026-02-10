"use client";

import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { CallConnect } from "./call-connect";

interface Props {
    meetingId: string;
    meetingName: string;
}

export const CallProvider = ({ meetingId, meetingName }: Props) => {
    const { data, isPending } = authClient.useSession();

    if (!data || isPending) {
        return <div><Loader2 className="w-4 h-4 animate-spin" /></div>;
    }
    return (
        <CallConnect
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            // userImage={data.user.image}
        />
    )
}