import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Tipe langsung pada parameter kedua
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const data = await prisma.order.findMany({
    select: {
      id: true,
      orderitem: {
        select: {
          course_id: true,
          course: {
            select: {
              id: true,
              title: true,
              description: true,
              status: true,
              duration: true,
              price: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    where: {
      user_id: id,
      status: "COMPLETED",
    },
  });

  return NextResponse.json(data);
}
