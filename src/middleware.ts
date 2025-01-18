import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const protectedRoutes = ['/admin', '/profile']; 
    // const token = req.cookies.get('token'); // Ambil token dari cookies
    const token = await getToken({ req })
    const isAuthenticated = !!token
    const url = req.nextUrl.clone(); // Clone URL request
 
    // Periksa apakah URL request sesuai dengan salah satu rute yang dilindungi
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
        if (!isAuthenticated) {
            // Jika tidak ada token, redirect ke halaman login
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
        if(token?.role !== 'admin' && url.pathname === '/admin') {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

    }

    return NextResponse.next(); // Lanjutkan ke rute yang diminta jika token ada
}

//'/courses/:path*', '/courses', 
export const config = {
    matcher: ['/users/:path*', '/admin/:path*', '/courses/:path*', '/profile/:path*'], // Konfigurasi rute yang dilindungi
};
