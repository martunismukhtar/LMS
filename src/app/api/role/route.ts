import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const roles = await prisma.roles.findMany({
    select: {
      id: true,
      name: true,
      description: true
    }
  });

  return NextResponse.json(roles);
}


// Handle POST request: Add a new user
export async function POST(req: Request) {
  const { name, description } = await req.json();
  const schema = z.object({
    name: z.string(),
    description: z.string()
  });
  const parsed = schema.safeParse({
    name: name,
    description: description
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const newRole = await prisma.roles.create({
    data: { name, description},
  });

  if (!newRole) {
    return NextResponse.json({ error: 'Failed to create role' }, { status: 500 });
  }

  return NextResponse.json(newRole);
}
