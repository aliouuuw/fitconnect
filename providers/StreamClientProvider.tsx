'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo, useCall } from '@stream-io/video-react-sdk';
import { useAuth } from "@/contexts/auth-context";
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useAuth();
  const call = useCall();

  useEffect(() => {
    console.log('Debug Stream Client:', {
      isLoaded,
      hasUser: !!user,
      hasApiKey: !!API_KEY,
      apiKey: API_KEY
    });

    if (!isLoaded) return;
    if (!API_KEY) throw new Error('Stream API key is missing');
    
    // If no user, render children without Stream client
    if (!user) {
      setVideoClient(undefined);
      return;
    }
    
    call?.camera.disable();
    call?.microphone.disable();

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.name || user?.id,
        image: `https://robohash.org/${user?.id}`,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, isLoaded, call]);

  // Show loader only while auth is loading
  if (!isLoaded) return <Loader />;
  
  // If no user or no video client needed, just render children
  if (!user || !videoClient) return <>{children}</>;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
