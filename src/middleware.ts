import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt"
// import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
    const protectedRoutes = ['/admin', '/profile']; // Daftar rute yang dilindungi
    // const token = req.cookies.get('token'); // Ambil token dari cookies
    //const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const token = await getToken({ req })
    const isAuthenticated = !!token
    // console.log(`dari middleware ${isAuthenticated}`)
    console.log(`dari middleware ${JSON.stringify(token)}`) // console.log(token)

    console.log(new Date(token?.exp * 1000))
    const url = req.nextUrl.clone(); // Clone URL request
    // const kwdv = jwt.decode(token?.accessToken as string)

    // console.log(kwdv)

    // const iex = new
    // console.log(decodedToken)

    // const nddd = new Date(decodedToken.exp * 1000);
    // console.log(nddd)

    // console.log(token?.role)
    // console.log(token?.exp)
    // console.log(protectedRoutes)
    // console.log(url.pathname)
    // console.log(protectedRoutes.some((route) => url.pathname.startsWith(route)))
    // Periksa apakah URL request sesuai dengan salah satu rute yang dilindungi
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (!isAuthenticated) {
            // Jika tidak ada token, redirect ke halaman login
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
       
    }

    return NextResponse.next(); // Lanjutkan ke rute yang diminta jika token ada
}

// function verifyToken(token: string): { role: string } {
//     const secret = process.env.SECRET_KEY; // Pastikan Anda menyimpan secret di env
//     if (!secret) {
//       throw new Error('JWT_SECRET is not defined in the environment variables');
//     }
//     return jwt.verify(token, secret) as { role: string };
//   }
//'/courses/:path*', '/courses', 
export const config = {
    matcher: ['/users/:path*', '/admin/:path*', '/courses/:path*', '/profile/:path*'], // Konfigurasi rute yang dilindungi
};
