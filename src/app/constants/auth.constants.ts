import { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import { PrismaAdapter } from '@auth/prisma-adapter';

import prisma from '@/app/lib/prisma';
import { User } from '@/app/interfaces/users.interfaces';
import { excludeFields } from '@/app/helpers/prisma.heplers';

export const nextAuthOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: {
          label: 'password',
          type: 'password'
        },
      },
      async authorize(credentials: Record<'email' | 'password', string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missed some required data');
        }

        const user: User | null = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isCorrectPassword) {
          throw new Error('User not found');
        }

        return excludeFields<User>(user, ['password']);
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user = token.user;
      }

      return session;
    },

    jwt({ user, token, trigger, session }) {
      if (trigger === 'update' && session.user) {
        token.user = session.user;
      } else if (user) {
        token.user = user;
      }

      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
