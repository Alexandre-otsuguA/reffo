import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: '/my-account/:path*',
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/my-account')) {
    const token = request.cookies.get('auth_token');
    if (!token) return NextResponse.rewrite(new URL('/404', request.url));
  }
}
