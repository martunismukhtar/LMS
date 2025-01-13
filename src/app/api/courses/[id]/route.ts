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

  const courses = await prisma.courses.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      price: true,
      duration: true,
    },
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(courses);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }>}
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const { title, description, status, price, duration } = await request.json();

  const course = await prisma.courses.findUnique({
    where: { id: Number(id) },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.courses.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        status,
        price,
        duration: Number(duration),
      },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Course updated successfully",
  });
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
