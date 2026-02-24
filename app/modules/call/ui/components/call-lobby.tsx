import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

import "@stream-io/video-react-sdk/dist/css/styles.css";


interface Props {
    onJoin: () => void;
}

const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();

    return (
        <DefaultVideoPlaceholder
            participant={
                {
                    name: data?.user?.name || "Unknown",
                } as StreamVideoParticipant
            } />
    )
}

const AllowBrowserPermissions = () => {
    return (<p>Allow browser permissions</p>)
}

export const CallLobby = ({ onJoin }: Props) => {
    const { useCameraState, useMicrophoneState } = useCallStateHooks();
    const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();

    const hasBrowserMediaPermissions = hasMicPermission && hasCameraPermission;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h2>Ready to join the call?</h2>
                    <p>Please ensure you have the necessary permissions to access your camera and microphone.</p>
                </div>
                <VideoPreview
                    DisabledVideoPreview={
                        hasBrowserMediaPermissions ? DisabledVideoPreview : AllowBrowserPermissions
                    } />
                <div className="flex gap-x-2">
                    <ToggleAudioPreviewButton />
                    <ToggleVideoPreviewButton />

                </div>

                <div className="flex gap-x-2 justify-between w-full">
                    <Button><Link href={"/meetings"}>Cancel</Link></Button>
                    <Button onClick={onJoin}><LogInIcon />Join Call</Button>
                </div>

            </div>

        </div>
    )


}