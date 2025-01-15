import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handler untuk POST request
export async function GET(
    request: Request,
  { params }: { params: Promise<{ id: string }>}
) {
  const { id } = await params;    
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
    console.log(course.title);
    // Simulasi respons berhasil
    return NextResponse.json({
      status: 'success',
      message: course.title,
    });
  } catch (error) {
    console.error("Error publishing course:", error);
    return NextResponse.json(
      { status: 'success', message: "Failed to publish course." },
      { status: 500 }
    );
  }
}
