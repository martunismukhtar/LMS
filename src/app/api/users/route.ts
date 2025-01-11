import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const users = await prisma.user.findMany({
    include: { role: true },
  });
  return NextResponse.json(users);
}

// Handle POST request: Add a new user
export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: { name, email, password },
  });

  return NextResponse.json(newUser);
}
