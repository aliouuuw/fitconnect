"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

import { useGetCallById } from '@/hooks/useGetCallById';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import Loader from "@/components/Loader";

export default function ClassroomPage({}) {
  const { id } = useParams();
  const { call, isCallLoading } = useGetCallById(id as string);
  const { isLoaded, user } = useAuth();
  
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold">
      Call Not Found
    </p>
  );

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowed) return <Alert title="You are not allowed to join this meeting" />;

  return (
    <div className="h-full w-full">
      <main>
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom />
            )}
          </StreamTheme>
        </StreamCall>
      </main>
    </div>
  );
}
