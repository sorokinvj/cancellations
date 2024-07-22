// lib/firebase/auth.ts
import { getAuth } from 'firebase-admin/auth';
import { initializeFirebaseAdmin } from './admin';

let firebaseInitialized = false;

export async function verifySessionCookie(sessionCookie: string) {
  if (!firebaseInitialized) {
    initializeFirebaseAdmin();
    firebaseInitialized = true;
  }

  const auth = getAuth();
  return auth.verifySessionCookie(sessionCookie, true);
}
