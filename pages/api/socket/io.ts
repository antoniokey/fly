import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { NextApiRequest } from 'next';

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

    response.socket.server.io = socketServer;
  }

  return response.end();
};

export default ioHandler;
