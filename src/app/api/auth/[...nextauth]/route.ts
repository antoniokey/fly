import NextAuth from 'next-auth';

import { nextAuthOptions } from '@/app/constants/auth.constants';

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
