'use server';

import { StreamClient } from '@stream-io/node-sdk';
import { cookies } from 'next/headers';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

export const tokenProvider = async () => {
  // Get user from cookie since we can't use context in server actions
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (!user) throw new Error('User is not authenticated');
  if (!STREAM_API_KEY) throw new Error('Stream API key is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  const expirationTime = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.generateUserToken({
    user_id: user.id,
    exp: expirationTime,
    iat: issuedAt,
  });

  return token;
};

// export const createInstantMeeting = async () => {
//   const cookieStore = await cookies();
//   const userCookie = cookieStore.get('user');
//   const user = userCookie ? JSON.parse(userCookie.value) : null;

//   if (!user) throw new Error('User is not authenticated');
//   if (!STREAM_API_KEY) throw new Error('Stream API key is missing');
//   if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

//   const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
  
//   const callId = `instant-${Date.now()}`;
  
//   // Create call
//   const call = await streamClient.call('default', callId).create({
//     created_by_id: user.id,
//     members: [{ user_id: user.id, role: 'host' }],
//     custom: {
//       createdBy: user.name,
//     },
//   });

//   return call;
// };
