import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default async function proxy(request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; // Get cookie from request

    if (request.nextUrl.pathname.startsWith('/admin') && !token) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("error", "You are not allowed to access login first", {
            path: "/",       // available on all pages
            maxAge: 2,       // expires in 2 seconds
            httpOnly: false, // allow frontend JS to read it
        });
        return response;
    }

    const restrictedForLoggedIn = ['/login', '/register'];
    if (restrictedForLoggedIn.includes(request.nextUrl.pathname) && token) {
        const response = NextResponse.redirect(new URL("/admin", request.url));
        response.cookies.set("error", "Logout First", {
            path: "/",       // available on all pages
            maxAge: 2,       // expires in 2 seconds
            httpOnly: false, // allow frontend JS to read it
        });
        return response;

    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*', '/login', '/register'],
}