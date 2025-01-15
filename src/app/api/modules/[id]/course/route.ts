import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handler untuk POST request
export async function POST(
    request: Request,
  { params }: { params: Promise<{ id: string }>}
) {
  const { id } = await params;
  const { status } = await request.json();
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    
    const course = await prisma.courses.findUnique({
        where: { id: Number(id) },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }
    const editStatus = status === "publish" ? "draft" : "publish";
    await prisma.courses.update({
      where: { id: Number(id) },
      data: {
        status: editStatus,
      },
    });

    // Simulasi respons berhasil
    return NextResponse.json({
      status: 'success',
      message: `Course with ID ${id} has been published.`,
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    return NextResponse.json(
      { status: 'success', message: "Failed to publish course." },
      { status: 500 }
    );
  }
}

export async function GET(
    request: Request,
  { params }: { params: Promise<{ id: number }>}
) {
  const { id } = await params;  
  const modules = await prisma.modules.findMany({    
    select:{
      id:true,
      title:true,
      lesson:{
        select:{
          id:true,
          title:true,
          duration:true
        }
      }
    },
    where: {
      course_id: Number(id)
    }    
  })
  if(!modules) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }
  return NextResponse.json({
        status: 'success',
        data: modules
  });
  
  }