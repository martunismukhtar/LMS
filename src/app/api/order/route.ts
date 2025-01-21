import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Midtrans from "midtrans-client";
import { z } from 'zod';

const prisma = new PrismaClient();

const snap = new Midtrans.Snap({
    isProduction: false,    
    serverKey: process.env.MID_SERVER_KEY as string,
    // clientKey: process.env.MID_CLIENT_KEY
});
interface TransactionDetails {
    order_id: string;
    gross_amount: number;
}
interface Detail {
  first_name: string;
          last_name: string;
          email: string
          phone: string
}
export async function POST(request: Request) {

    const { user_id, first_name, last_name, email, cartItems } = await request.json();
    const schema = z.object({
        user_id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        cartItems: z.array(
            z.object({
              price: z.string(),
              quantity: z.number(),
              course_id: z.string(),
            })
          ),
    });
    const parsed = schema.safeParse({
        user_id: user_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        cartItems: cartItems        
    });
    if (!parsed.success) {        
        return NextResponse.json({
          status: "error",
          message: parsed.error.errors[0].message,
        }, { status: 400 });  
    }
   
    const total_amount = cartItems.reduce(
        (total: number, item: { quantity: number; price: number }) => total + item.quantity * item.price,
        0
    )    
    const order = await prisma.order.create({
      data: {
        user_id: user_id,
        total_amount: total_amount,
        status: "PENDING", // Status default
      }
    })
    
    const items = cartItems.map((item:{ 
        order_id: string;
        course_id: string; 
        quantity: number; 
        price: number;
        total_price: number;
    }) => ({
        order_id: order.id,
        course_id: item.course_id,        
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.quantity * item.price
      }));
  
      await prisma.orderItems.createMany({
        data: items,
      });

      const user = await prisma.user.findUnique({
        where: {
          id: user_id
        }
      })
      const transactionDetails: TransactionDetails = {
        order_id: order.id.toString(),
        gross_amount: Number(total_amount),
      };
      
      const customerDetails: Detail = {
        first_name: user!.name,
        last_name: user!.name,
        email: user!.email,
        phone: "081122334455",
      };
      const params = {
        transaction_details: transactionDetails,
        credit_card: {
          secure: true,
        },
        customer_details: customerDetails,
      }

      
    const token = (await snap.createTransaction(params)).token;
    return NextResponse.json({ 
      // message: "Order created successfully", 
      data:token 
    });
}