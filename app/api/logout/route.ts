// app/api/logout/route.ts
import { NextResponse } from 'next/server';
import { initializeFirebaseAdmin } from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    initializeFirebaseAdmin();
    const auth = getAuth();

    const sessionCookie = cookies().get('session')?.value;

    if (sessionCookie) {
      // Verify the session cookie. In this case, we want to revoke
      // the session cookie, so we're passing in checkRevoked:false
      const decodedClaims = await auth.verifySessionCookie(
        sessionCookie,
        false,
      );
      // Revoke refresh tokens for the user
      await auth.revokeRefreshTokens(decodedClaims.sub);
    }

    const response = NextResponse.json({ status: 'success' });

    // Clear the session cookie
    response.cookies.set('session', '', {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
