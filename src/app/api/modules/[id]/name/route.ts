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
    
    const data = await prisma.modules.findUnique({
        where: { id: id },
    });

    if (!data) {
      return NextResponse.json({ error: "Module not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      status: 'success',
      message: data.title,
    });
  } catch (error) {
    console.error("Error internal server:", error);
    return NextResponse.json(
      { status: 'error', message: "Error internal server." },
      { status: 500 }
    );
  }
}
