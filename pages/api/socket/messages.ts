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

    response.socket.server.io.emit('new-message', createdMessage);
  }

  if (request.method === 'DELETE') {
    const { searchParams } = new URL(`${process.env.BASE_URL}${request.url}`);

    const conversationId = searchParams.get('conversationId') as string;

    await prisma.messages.deleteMany({
      where: { conversation_id: +conversationId }
    });

    response.socket.server.io.emit('clear-messages');
  }
  
  return response.end(null);
}
