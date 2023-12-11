import { NextResponse } from 'next/server';

import prisma from '@/app/lib/prisma';

export async function PUT(request: Request): Promise<NextResponse> {
  const body = await request.json();

  const splittedUrl = request.url.split('/');
  const userId = +splittedUrl[splittedUrl.length - 1];

  await prisma.users.update({
    where: { id: userId },
    data: body,
  });

  return new NextResponse(null);
}
