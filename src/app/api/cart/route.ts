import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Handle GET request: Fetch all categories (courses)
export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    const serializedData = categories.map((item) => ({
      ...item,
      id: item.id?.toString(), // Pastikan hanya kolom BigInt yang dikonversi
    }));

    return NextResponse.json(serializedData);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle POST request: Add or update cart for a user
export async function POST(req: Request) {
  try {
    const { user_id, cartItems } = await req.json();    
    // Validasi input menggunakan Zod
    const schema = z.object({
      user_id: z.string(),
      cartItems: z.array(
        z.object({
          price: z.string(),
          quantity: z.number(),
          course_id: z.string(),
        })
      ),
    });

    const parsed = schema.safeParse({
      user_id,
      cartItems,
    });    
    if (!parsed.success) {
      console.log(parsed.error.errors[0].message);
      return NextResponse.json({
        status: "error",
        message: parsed.error.errors[0].message,
      }, { status: 400 });

    }

    const existingCart = await prisma.cart.findMany({
      where: { user_id: String(user_id) },
    });
    console.log(existingCart);
    let newCart = {};
    if (existingCart.length === 0) {
      newCart = await prisma.cart.create({
        data: {
          user_id: user_id,
          cartitem: {
            create: cartItems.map(
              (item: {
                course_id: string;
                quantity: number;
                price: number;
              }) => ({
                id: uuidv4(),
                course_id: item.course_id,
                quantity: Number(item.quantity),
                price: Number(item.price),
              })
            ),
          },
        },
        include: {
          cartitem: true, // Include cartItems dalam response
        },
      });
    } else {
      console.log(existingCart);
      console.log(cartItems)
      newCart = await prisma.cart.upsert({
        where: { id: existingCart[0]?.id },
        update: {
          cartitem: {
            deleteMany: {},
            create: cartItems.map(
              (item: {
                course_id: string;
                quantity: number;
                price: number;
              }) => ({
                id: uuidv4(),
                course_id: item.course_id,
                quantity: Number(item.quantity),
                price: Number(item.price),
              })
            ),
          },
        },
        create: {
          user_id: user_id,
          cartitem: {
            create: cartItems.map(
              (item: {
                course_id: string;
                quantity: number;
                price: number;
              }) => ({
                id: uuidv4(),
                course_id: item.course_id,
                quantity: item.quantity,
                price: item.price,
              })
            ),
          },
        },
        include: {
          cartitem: true, // Include cartItems dalam response
        },
      });
    }
    console.log(newCart);
    return NextResponse.json(newCart);
  } catch (error) {
    console.error("Error processing cart request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
