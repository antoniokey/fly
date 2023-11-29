import prisma from '@/app/lib/prisma';

import { NextApiResponseSocketServer } from '../../../types';

export default async function handler(
  request: Request,
  response: NextApiResponseSocketServer,
): Promise<NextApiResponseSocketServer> {
  if (request.method === 'POST') {
    const {
      conversationId,
      receiverId,
      message,
      session,
    } = request.body as any;


    const createdMessage = await prisma.messages.create({
      data: {
        message,
        conversation_id: conversationId,
        sender_id: session?.data?.user?.id,
        receiver_id: receiverId,
      },
    });

    response.socket.server.io.emit('message', createdMessage);

    return response.end(null);
  }
  
  return response.end(null);
}
