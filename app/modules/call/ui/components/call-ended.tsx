"use client";

import Link from "next/link";
import { PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    meetingName?: string;
}

export const CallEnded = ({ meetingName }: Props) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground">
            <div className="flex flex-col items-center justify-center gap-6 max-w-md px-6 text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground">
                    <PhoneOff className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Call ended</h2>
                    <p className="text-muted-foreground">
                        {meetingName
                            ? `The meeting "${meetingName}" has ended.`
                            : "The call has ended. You can return to your meetings."}
                    </p>
                </div>
                <Button asChild>
                    <Link href="/meetings">Back to meetings</Link>
                </Button>
            </div>
        </div>
    );
};
