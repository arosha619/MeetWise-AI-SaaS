"use client";
import {
    Call,
    CallingState,
    StreamCall,
    StreamVideo,
    StreamVideoClient
} from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import "@stream-io/video-react-sdk/dist/css/index.css";
import { useEffect, useState } from "react";
import CallUI from "./call-ui";
interface Props {
    meetingId: string;
    meetingName: string;
    userId: string;
    userName: string;
    userImage?: string;
}
export const CallConnect = ({
    meetingId,
    meetingName,
    userId,
    userName,
    userImage }: Props) => {
    const trpc = useTRPC();
    const { mutateAsync: generateToken } = useMutation(
        trpc.meeting.generateToken.mutationOptions(),
    )

    const [client, setClient] = useState<StreamVideoClient | null>(null);
    useEffect(() => {
        const _client = new StreamVideoClient({
            apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
            user: {
                id: userId,
                name: userName,
                image: userImage || "",
            },
            tokenProvider: generateToken,

        });
        setClient(_client);

        return () => {
            _client.disconnectUser();
            setClient(null);
        };
    }, [userId, userName, userImage, generateToken]);

    const [call, setCall] = useState<Call | null>(null);
    useEffect(() => {
        if (!client) return;

        const _call = client.call("default", meetingId);
        _call.camera.disable();
        _call.microphone.disable();
        setCall(_call);

        return () => {
            if (_call.state.callingState !== CallingState.LEFT) {
                _call.leave();
                _call.endCall();
                setCall(null);
            }
        }

    }, [client, meetingId]);

    if (!client || !call) return (
        <div>Loading...</div>
    );


    return (
        <StreamVideo client={client}> Call connect
            <StreamCall call={call} >
                <CallUI meetingName={meetingName}/>
            </StreamCall>
        </StreamVideo>
    )
}