import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketServer } from 'socket.io';

export type NextApiResponseSocketServer = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketServer;
    };
  };
};
