import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET() {
  const courses = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      courses: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true
        },
        where: {
          status: "publish"
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });
//   courses.forEach((category) => {
//     category.courses = category.courses.filter((course) => course !== null);
//   });

  return NextResponse.json(courses);
}