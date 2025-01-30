import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'Alice',
        email: `alice${Math.random()}@test.com` // 중복 방지를 위한 랜덤 이메일
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
