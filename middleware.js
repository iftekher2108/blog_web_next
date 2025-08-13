import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request) {
    const token = request.cookies.get("token")?.value; // Get cookie from request

    if (request.nextUrl.pathname.startsWith('/admin') && !token) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.set("error", "You are not allowed to access login first", {
            path: "/",       // available on all pages
            maxAge: 3,       // expires in 5 seconds
            httpOnly: false, // allow frontend JS to read it
        });
        return response;
    }

    const restrictedForLoggedIn = ['/login', '/register'];
    if (restrictedForLoggedIn.includes(request.nextUrl.pathname) && token) {
        const response = NextResponse.redirect(new URL("/admin", request.url));
        response.cookies.set("error", "Logout First", {
            path: "/",       // available on all pages
            maxAge: 3,       // expires in 5 seconds
            httpOnly: false, // allow frontend JS to read it
        });
        return response;

    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*','/login','/register'],
}