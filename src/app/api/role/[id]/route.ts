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

  const data = await prisma.roles.findMany({
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

  const role = await prisma.roles.findUnique({
    where: { id: Number(id) },
  });

  if (!role) {
    return NextResponse.json({ error: "Role not found" }, { status: 404 });
  }

  try {
    await prisma.roles.update({
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

  const course = await prisma.roles.findUnique({
    where: { id: Number(id) },
  });

  if (!course) {
    return NextResponse.json({ error: "Role not found" }, { status: 404 });
  }

  try {
    await prisma.roles.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json(
      { error: "Failed to delete role" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Role deleted successfully",
  });
}
