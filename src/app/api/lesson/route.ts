import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { 
    title, 
    description, 
    video_url,
    content, 
    duration, 
    is_published, 
    module_id 
} = await req.json();
console.log({ 
    title, 
    description, 
    video_url,
    content, 
    duration, 
    is_published, 
    module_id 
});
 try {

    const newData = await prisma.lessons.create({
      data: { 
        id:uuidv4(),        
        title, 
        description,
        video_url,
        content, 
        duration: Number(duration),
        is_published,
        module_id:String(module_id),
        updated_at: new Date(),
      },
    });
    return NextResponse.json(newData);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
  
}