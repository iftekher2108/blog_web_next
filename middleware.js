import { NextRequest, NextResponse } from "next/server";

export default function Middleware(request) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // return NextResponse.redirect(new URL('/',request.url))
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.set("error", "You are not allowed to access this page", {
            path: "/",       // available on all pages
            maxAge: 5,       // expires in 5 seconds
            httpOnly: false, // allow frontend JS to read it
        });
        return response;
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*','/api/admin/:path*'],
}