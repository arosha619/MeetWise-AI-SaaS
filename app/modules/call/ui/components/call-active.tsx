import Link from "next/link";
import Image from "next/image";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props {
    onLeave: () => void;
    meetingName: string;
}

export const CallActive = ({ onLeave, meetingName }: Props) => {
    return (
        <div>
            <div>
                <Link href="/" className="flex items-center gap-2">
                <Image src="/logo-color.svg" alt="MeetWise Logo" width={32} height={32} />
                </Link>
                <h4>
                    {meetingName}
                </h4>
            </div>
            <SpeakerLayout/>
            <div>
                <CallControls  onLeave={onLeave}/>
            </div>
        </div>
    )
}