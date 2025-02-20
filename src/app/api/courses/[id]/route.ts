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
      category_id: true
    },
    where: {
      id: id,
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

  const { title, description, status, price, duration, category_id } = await request.json();

  const course = await prisma.courses.findUnique({
    where: { id: id },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.courses.update({
      where: { id: id },
      data: {
        title,
        description,
        status,
        price: Number(price),
        duration: Number(duration),
        category_id: category_id
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
    where: { id: id },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.courses.delete({
      where: { id: id },
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
