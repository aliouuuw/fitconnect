'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import Alert from './Alert';
import { Button } from './ui/button';

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const t = useTranslations('meetingSetup');
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error(
      'useStreamCall must be used within a StreamCall component.',
    );
  }

  // https://getstream.io/video/docs/react/ui-cookbook/replacing-call-controls/
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  console.log("Call time not arrived: ", callTimeNotArrived)

  if (callTimeNotArrived)
    return (
      <Alert
        title={t('notStarted', {
          time: callStartsAt.toLocaleString(),
        })}
        showRefreshButton={true}
        refreshButtonText={t('refreshButton')}
        refreshButtonNotice={t('refreshButtonNotice')}
      />
    );

  if (callHasEnded)
    return (
      <Alert
        title={t('ended')}
        iconUrl="/icons/call-ended.svg"
      />
    );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 py-4">
      <h1 className="text-center text-2xl font-bold">{t('title')}</h1>
      <div className="w-[600px]">
        <VideoPreview />
      </div>
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          {t('joinWithoutDevices')}
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        {t('joinButton')}
      </Button>
    </div>
  );
};

export default MeetingSetup;
