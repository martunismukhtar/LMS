import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
      duration: true,
      category:{
        select: {          
          name: true
        }
      }
    }
  });

  const serializedData = courses.map((item) => ({
    ...item,
    id: item.id?.toString(), // Pastikan hanya kolom BigInt yang dikonversi
  }));

  return NextResponse.json(serializedData);
}

// Handle POST request: Add a new data
export async function POST(req: Request) {
  const { title, description, status, price, duration, category_id } = await req.json();
 try {
    const newCourse = await prisma.courses.create({
      data: {       
        title, 
        description, 
        status, 
        price: Number(price), 
        duration:Number(duration), 
        category_id: category_id
      },
    });
    return NextResponse.json(newCourse);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
  
}
