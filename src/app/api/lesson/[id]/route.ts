import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }>} // Tipe langsung pada parameter kedua
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const data = await prisma.lessons.findMany({    
    where: {
      id: id,
    },
  });
  return NextResponse.json(data);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }>}
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const { title, description, video_url, content, duration, is_published, module_id } = await request.json();

  const data = await prisma.lessons.findUnique({
    where: { id: id },
  });

  if (!data) {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }

  try {
    await prisma.lessons.update({
      where: { id: id },
      data: {
        title,
        description,
        video_url,
        content,
        duration: Number(duration),
        is_published,
        module_id: module_id
      },
    });
    return NextResponse.json({
      status: "success",
      message: "Lesson updated successfully",
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }

  
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }>}
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const course = await prisma.courses.findUnique({
    where: { id: Number(id) },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.courses.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Course deleted successfully",
  });
}
