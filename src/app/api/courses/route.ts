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
  const { title, description, status, price, duration, category_id } = await req.json();
 try {
    const newCourse = await prisma.courses.create({
      data: { 
        title, 
        description, 
        status, 
        price: Number(price), 
        duration:Number(duration), 
        category_id: Number(category_id)
      },
    });
    return NextResponse.json(newCourse);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
  
}
