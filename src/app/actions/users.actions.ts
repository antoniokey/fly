import { getServerSession } from 'next-auth';

import prisma from '../lib/prisma';
import { nextAuthOptions } from '../constants/auth.constants';
import { excludeFields } from '../helpers/prisma.heplers';
import { User } from '../interfaces/users.interfaces';

export const getUsers = async (): Promise<User[]> => {
  const session = await getServerSession(nextAuthOptions);

  const users: User[] = await prisma.users.findMany({
    where: {
      id: {
        not: session?.user.id,
      },
    },
  });

  return excludeFields<User[]>(users, ['password']);
};

export const getUser = async (id: number): Promise<User> => {
  const user: User | null = await prisma.users.findFirst({
    where: { id },
  });

  return excludeFields<User | null>(user, ['password']);
};
