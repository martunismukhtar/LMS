import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
// import { cookies } from 'next/headers';  
import { NextResponse } from 'next/server';

export async function GET({refreshToken}:{refreshToken:string}) {
  console.log(`refreshToken ${refreshToken}`);
  // const cookies = req.cookies();
  // const refreshToken = cookies.get('refreshToken');
  // console.log(`refreshToken ${refreshToken}`);

  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken as string;
  // const refreshToken = (await cookies()).get('refreshToken');
  // console.log(`refreshToken ${refreshToken}`);
  try {
    const response = await fetch(`${process.env.VITE_API}courses`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    
    // Mengirimkan data JSON ke klien
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error(); // Mengembalikan error jika gagal
  }
}
