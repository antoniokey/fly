'use client';

import { useEffect, useState } from 'react';

import { Status } from '../enum/users.enum';

import { useSocket } from './useSocket';
import { isUserOnline } from '../helpers/socket.helpers';

export const useStatus = (userId: number): Status => {
  const [status, setStatus] = useState(Status.Offline);

  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(
        'online-users',
        onlineUsers => {
          if (isUserOnline(onlineUsers, userId)) {
            setStatus(Status.Online);
          } else {
            setStatus(Status.Offline);
          }
        },
      );
    }
  }, [userId, socket]);

  return status;
};
