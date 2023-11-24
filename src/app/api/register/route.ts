import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';

import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      password,
      first_name,
      last_name,
    } = body;

    if (!email || !password || !first_name || !last_name) {
      return new NextResponse('Missing some data', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const {
      password: createdUserPassword,
      ...createdUserResponse
    } = await prisma.users.create({
      data: {
        email,
        first_name,
        last_name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(createdUserResponse);
  } catch(error: any) {
    console.error('Registration error');

    return new NextResponse(error, { status: 500 });
  }
}
