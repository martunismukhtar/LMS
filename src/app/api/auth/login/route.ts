import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// const users = [
//   { id: 1, email: 'user@example.com', password: '$2b$10$hashedPasswordHere' }, // Password: "password123"
// ];

const SECRET_KEY = 'your-secret-key'; // Gunakan .env untuk menyimpan kunci ini

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validasi input
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Cari user berdasarkan email
  const user = await prisma.user.findFirst({ where: { email: email } });
  if (!user) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Periksa password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }

  // Buat token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  return NextResponse.json({ token });
}
