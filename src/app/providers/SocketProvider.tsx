'use client';

import { createContext, useEffect, useState } from 'react';

import { io as ClientIO, Socket } from 'socket.io-client';

import { useSession } from 'next-auth/react';

import { PageProps } from '../interfaces/common.interfaces';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export default function SocketProvider({ children }: PageProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const session = useSession();

  useEffect(() => {
    const socketInstance: Socket = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_SITE_URL!,
      {
        path: '/api/socket/io',
        addTrailingSlash: false,
        auth: { token: session.data?.user?.id },
      },
    );

    socketInstance.on('connect', () => {
      setIsConnected(true);

      socketInstance.emit('user-online', session.data?.user.id);
    });

    socketInstance.on('disconnect', () => setIsConnected(false));

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

