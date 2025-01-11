import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const protectedRoutes = ['/users', '/profile']; // Daftar rute yang dilindungi
    // const token = req.cookies.get('token'); // Ambil token dari cookies
    //const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const token = await getToken({ req })
    const isAuthenticated = !!token

    const url = req.nextUrl.clone(); // Clone URL request

    // console.log(token)

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
//'/courses/:path*', '/courses', 
export const config = {
    matcher: ['/users/:path*', '/profile/:path*'], // Konfigurasi rute yang dilindungi
};
