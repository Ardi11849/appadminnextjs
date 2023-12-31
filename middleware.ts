import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.url;
    console.log(request.nextUrl.pathname);
    if (request.nextUrl.pathname != '/') {
        return NextResponse.rewrite(new URL(request.nextUrl.pathname+'/view', url))
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|app/page.tsx).*)',
    ],
}