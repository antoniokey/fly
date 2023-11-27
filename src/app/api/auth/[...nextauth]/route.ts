import { PrismaAdapter } from '@auth/prisma-adapter';

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import prisma from '@/app/lib/prisma';

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

        const user = await prisma.users.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error('User not found');
        }

        const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isCorrectPassword) {
          throw new Error('User not found');
        }

        const { password, ...userResponse } = user;

        return userResponse;
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

    jwt({ user, token }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
