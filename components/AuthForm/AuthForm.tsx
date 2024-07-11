'use client';

import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui';
import Spinner from '../ui/Spinner';

export const AuthForm = () => {
  const router = useRouter();
  const { user, loading, loginWithGoogle } = useAuth();
  const [error, setError] = useState<null | string>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const t = useTranslations();

  const handleLoginWithGoogle = async () => {
    try {
      const signupResult = await loginWithGoogle();
      if (signupResult) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      setIsRedirecting(true);
      router.push(`/dashboard`);
    }
  }, [user, loading]);

  return (
    <>
      {loading || isRedirecting ? (
        <Spinner />
      ) : (
        <>
          <Button onClick={handleLoginWithGoogle} variant='ghost'>
            <Image
              src='/google-logo.svg'
              alt='Google Logo'
              className='mr-2 -mt-[5px]'
              width={20}
              height={20}
              priority
            />
            {t('auth-with-google')}
          </Button>

          {error && <p>{error}</p>}
        </>
      )}
    </>
  );
};
