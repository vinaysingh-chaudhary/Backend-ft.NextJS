import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    const path = request.nextUrl.pathname; 

    const isPublic = path === "/login" || path === "/signup" 
    const token = request.cookies.get("accessToken")?.value || ''

    if(token && isPublic){
        return NextResponse.redirect(new URL('/',request.url)); 
    } 

    if(!token && !isPublic){
        return NextResponse.redirect(new URL('/login', request.url)); 
    }
}

export const config = {
    matcher: [
        '/login',
        '/signup',
        '/profile',
    ]
}