import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const courses = await prisma.courses.findMany();

  const serializedData = courses.map((item) => ({
    ...item,
    bigIntField: item.id?.toString(), // Pastikan hanya kolom BigInt yang dikonversi
  }));

  return NextResponse.json(serializedData);
}

// Handle POST request: Add a new user
export async function POST(req: Request) {
  const { title, description, status, price, duration } = await req.json();

  if (!title || !description || !status || !price || !duration) {
    return NextResponse.json({ error: 'data tidak boleh kosong' }, { status: 400 });
  }

  const newCourse = await prisma.courses.create({
    data: { title, description, status, price, duration },
  });

  return NextResponse.json(newCourse);
}
