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

  const data = await prisma.categories.findMany({
    select: {
      id: true,
      name: true,
      description: true
    },
    where: {
      id: Number(id),
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

  const { name, description } = await request.json();

  const course = await prisma.categories.findUnique({
    where: { id: Number(id) },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.categories.update({
      where: { id: Number(id) },
      data: {
        name,
        description
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

  const course = await prisma.categories.findUnique({
    where: { id: Number(id) },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  try {
    await prisma.categories.delete({
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
