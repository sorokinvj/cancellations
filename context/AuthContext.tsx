'use client';

import {
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  OAuthCredential,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import axios from 'axios';

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          image: user.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account',
      });
      const result: UserCredential = await signInWithPopup(
        auth,
        provider,
        browserPopupRedirectResolver,
      );

      return result;
    } catch (error) {
      console.log('error=', error);
      if (error === 'FirebaseError: Firebase: Error (auth/popup-blocked).') {
      } else {
      }
    }
  };

  const loginWithToken = async (token: string) => {
    console.log(
      'process.env.NEXT_PUBLIC_SERVER_URL=',
      process.env.NEXT_PUBLIC_SERVER_URL,
    );
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signin-site`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      loginWithVerifiedGoogleToken(token);
    } catch (error) {
      console.error('Error verifying token:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithVerifiedGoogleToken = async (verifiedToken: string) => {
    try {
      const credential: OAuthCredential = GoogleAuthProvider.credential(
        null,
        verifiedToken,
      );

      const result = await signInWithCredential(auth, credential);

      return result;
    } catch (error) {
      console.error('Error signing in with Google credential:', error);
    }
  };

  const resetPassword = async (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    setUser(null);
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
        error,
        resetPassword,
        loginWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
