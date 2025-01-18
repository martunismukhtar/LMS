import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handle GET request: Fetch all users
export async function GET(
    request: Request,
    { params }: { params: Promise<{ user_id: string }>}
) {
    const { user_id } = await params;  
  const cart = await prisma.cart.findMany({
    select: {
      id: true,
      status: true,
      cartitem: {
        select: {
          id: true,          
          price: true,
          quantity: true,
          course_id: true,
          course: {
            select: {                
                title: true,
                description: true,
            }
          }
        }
      }
    },
    where: {
      user_id: user_id
    }
  });

  return NextResponse.json(cart);
}