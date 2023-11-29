import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import prisma from '@/app/lib/prisma';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const {
      email,
      password,
      first_name,
      last_name,
      image,
      image_color,
    } = body;

    if (!email || !password || !first_name || !last_name) {
      return new NextResponse('Missed some required data', { status: 400 });
    }

    const userWithTheSameEmail = await prisma.users.findFirst({
      where: { email },
    });

    if (userWithTheSameEmail) {
      return new NextResponse('User already exists', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.users.create({
      data: {
        email,
        first_name,
        last_name,
        image,
        image_color,
        password: hashedPassword,
      },
    });

    return new NextResponse();
  } catch(error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
