import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
interface Props {
    meetingName: string;
}

const CallUI = ({ meetingName }: Props) => {
    const call = useCall();
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const handleJoin = async () => {
        if (!call) return;
        await call.join();
        setShow("call");
    }

    const handleLeave = async () => {
        if (!call) return;
        call.endCall();
        setShow("ended");
    }
    return (
        <StreamTheme className="">
            {show === "lobby" && <p>lobby</p>}
            {show === "call" && <p>call</p>}
            {show === "ended" && <p>ended</p>}

        </StreamTheme>
    )
}
export default CallUI;