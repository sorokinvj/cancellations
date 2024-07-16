'use client';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase/config';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        if (user) {
          setUser(user);
        }
        setLoading(false);
      },
      error => {
        setError(error.message);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const logout = () => {
    setUser(null);
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
