import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import { cn } from "@/lib/utils";

interface Props {
    onLeave: () => void;
    meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <header className="flex items-center gap-3 px-4 py-3 border-b border-border shrink-0">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground p-1.5 -m-1.5"
                    aria-label="Back to home"
                >
                    <Image src="/logo-color.svg" alt="MeetWise Logo" width={32} height={32} />
                </Link>
                <h4 className="text-lg font-semibold truncate flex-1" title={meetingName}>
                    {meetingName}
                </h4>
            </header>
            <main className="flex-1 min-h-0 overflow-hidden">
                <SpeakerLayout />
            </main>
            <footer
                className={cn(
                    "flex items-center justify-center px-4 py-4 border-t border-border shrink-0",
                    "bg-muted/30"
                )}
            >
                <CallControls onLeave={onLeave} />
            </footer>
        </div>
    );
}