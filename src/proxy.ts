import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get('archive_session');
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard');

  let isValidSession = false;
  if (sessionCookie?.value) {
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      if (new Date(sessionData.expires) > new Date()) {
        isValidSession = true;
      }
    } catch (e) {
      // Invalid JSON
    }
  }

  if (isDashboard && !isValidSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/login' && isValidSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
