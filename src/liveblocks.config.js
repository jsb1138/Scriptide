import { createClient } from '@liveblocks/client';
import { createRoomContext } from '@liveblocks/react';
const client = createClient({
  publicApiKey:
    'pk_dev_BTiajCZ57GZhfLHVvqqS9imakU0nMz81AAiLk38lJPVLi89_SSHsMRtpkbRyUysP',
});
export const {
  suspense: {
    RoomProvider,
    useOthers,
    useUpdateMyPresence,
    useStorage,
    useMutation,
  },
} = createRoomContext(client);
