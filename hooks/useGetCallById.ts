import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) {
      setIsCallLoading(false); // Add this line to handle when client is not ready
      return;
    }
    
    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({ 
          filter_conditions: { id }
        });
        if (calls.length > 0) setCall(calls[0]);
        setIsCallLoading(false);
      } catch (error) {
        console.error('Error loading call:', error);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
