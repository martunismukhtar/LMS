import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const user = await prisma.user.findFirst({ where: { email: email } });
  if (user) {
    return NextResponse.json({ 
      message:'Email already exists', 
      status: 'error' }, { status: 409 });
  }

  const newUser = await prisma.user.create({
    data: { name, email, password:await bcrypt.hash(password, 10) },
  });

  return NextResponse.json(newUser);

}