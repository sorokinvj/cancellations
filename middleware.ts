// file: middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|reset-password).*)',
  ], // Skip API routes, static files, image files, favicon, login, and reset password routes
  runtime: 'nodejs', // Specify Node.js runtime
};

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If session exists, allow the request to continue
  return NextResponse.next();
}
