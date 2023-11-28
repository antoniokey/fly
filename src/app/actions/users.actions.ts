import { getServerSession } from 'next-auth';

import prisma from '../lib/prisma';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';

export const getUsers = async () => {
  const session = await getServerSession(nextAuthOptions);

  const users = await prisma.users.findMany({
    where: {
      id: {
        not: session?.user.id,
      },
    },
  });

  return users;
};

export const getUser = async (id: number) => {
  const user = await prisma.users.findFirst({
    where: { id },
  });

  return user;
};
