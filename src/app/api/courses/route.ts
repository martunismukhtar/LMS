import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      price: true,
      duration: true
    }
  });

  const serializedData = courses.map((item) => ({
    ...item,
    id: item.id?.toString(), // Pastikan hanya kolom BigInt yang dikonversi
  }));

  return NextResponse.json(serializedData);
}

// export async function GetById(id: string) {
//   const course = await prisma.courses.findUnique({
//     where: { id: Number(id) },
//     select: {
//       id: true,
//       title: true,
//       description: true,
//       status: true,
//       price: true,
//       duration: true
//     }
//   });

//   return NextResponse.json(course);
// }

  // const { id, title, description, status, price, duration } = await req.json();

  // if (!id || !title || !description || !status || !price || !duration) {
  //   return NextResponse.json({ error: 'data tidak boleh kosong' }, { status: 400 });
  // }

  // const updatedCourse = await prisma.courses.update({
  //   where: { id: Number(id) },
  //   data: { title, description, status, price, duration },
  // });  

  // return NextResponse.json({
  //   message: 'Course updated successfully',
  //   course: updatedCourse
  // })
// }

// Handle POST request: Add a new user
export async function POST(req: Request) {
  const { title, description, status, price, duration } = await req.json();
  const schema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    price: z.number(),
    duration: z.number()
  });
  const parsed = schema.safeParse({
    title: title,
    description: description,
    status: status,
    price: price,
    duration: duration
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const newCourse = await prisma.courses.create({
    data: { title, description, status, price, duration },
  });

  if (!newCourse) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }

  return NextResponse.json(newCourse);
}
