import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, course_id } = await req.json();
 try {
    const newData = await prisma.modules.create({
      data: { 
        id:uuidv4(),
        title, 
        course_id: Number(course_id)
      },
    });
    return NextResponse.json(newData);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
  
}