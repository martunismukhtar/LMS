import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const data = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      description: true
    }
  });

  return NextResponse.json(data);
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

  const newCategory = await prisma.categories.create({
    data: { 
      name, 
      description
    },
  });

  if (!newCategory) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }

  return NextResponse.json(newCategory);
}
