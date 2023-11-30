import { Server as HttpServer } from 'http';

import { Server as SocketServer } from 'socket.io';

import { NextApiRequest } from 'next';

import { isUserOnline } from '@/app/helpers/socket.helpers';
import { OnlineUser } from '@/app/interfaces/users.interfaces';

import { NextApiResponseSocketServer } from '../../../types';

export const config = {
  api: {
    bobyParser: false,
  },
};

const ioHandler = (
  requset: NextApiRequest,
  response: NextApiResponseSocketServer,
): NextApiResponseSocketServer => {
  if (!response.socket.server.io) {
    const path = '/api/socket/io';
    const httpServer: HttpServer = response.socket.server as any;
    const socketServer = new SocketServer(
      httpServer,
      {
        path,
        addTrailingSlash: false,
      },
    );

    let onlineUsers: OnlineUser[] = [];

    response.socket.server.io = socketServer;

    socketServer.on('connection', socket => {
      socket.on('user-online', id => {
        if (!isUserOnline(onlineUsers, id)) {
          onlineUsers.push({ id, socketId: socket.id });

          socketServer.emit('online-users', onlineUsers);
        }
      });

      socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(onlineUser =>
          onlineUser.socketId !== socket.id,
        );

        socketServer.emit('online-users', onlineUsers);
      });
    });
  }

  return response.end();
};

export default ioHandler;
