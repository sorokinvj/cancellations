/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IconType } from 'react-icons/lib';
import { FaChartSimple } from 'react-icons/fa6';
import { FaPhone, FaCog, FaUser } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';
import { auth } from '@/firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from '../Login/Login';

const SidebarButton: React.FC<{
  link: string;
  label: string;
  Icon: IconType;
  activePaths?: string[];
  isFullWidth: boolean;
}> = ({ link, label, Icon, activePaths, isFullWidth }) => {
  const pathname = usePathname();
  const isActive =
    link === pathname ||
    activePaths?.includes(pathname) ||
    activePaths?.includes('/' + pathname.split('/')[1]);

  return (
    <li>
      <Link href={link}>
        <div
          className={clsx(
            isActive
              ? 'text-flair-700 bg-flair-100'
              : 'hover:text-flair-700 hover:bg-flair-50 text-gray-700',
            'text-md group flex items-center gap-x-3 rounded-md p-2 font-semibold',
          )}
        >
          <div className="flex h-7 w-7 items-center justify-center">
            <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
          </div>
          {isFullWidth && <>{label}</>}
        </div>
      </Link>
    </li>
  );
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [showSignOutButton, setShowSignOutButton] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user?.email) {
        setUser({ email: user.email });
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={clsx(
          'grid h-screen w-screen grid-rows-[64px_1fr]',
          'grid-cols-[20rem_1fr]',
        )}
      >
        <div
          className={clsx('fixed inset-y-0 z-50 flex flex-col', 'w-[20rem]')}
        >
          <div className="flex grow flex-col border-r border-gray-200 bg-white px-6">
            <img
              src="/images/proxz.png"
              className="mt-4 w-[100px]"
              alt="Proxz logo"
            />

            <nav className="mt-3 flex flex-1 flex-col">
              <ul
                role="list"
                className="flex flex-1 flex-col gap-y-5 justify-between pb-4"
              >
                <div className="flex flex-col gap-y-2">
                  <SidebarButton
                    link="/"
                    label="Overview"
                    Icon={FaChartSimple}
                    activePaths={[
                      '/overview-customer-support',
                      '/overview-refunds',
                    ]}
                    isFullWidth
                  />
                  <SidebarButton
                    link="/data"
                    label="Call Logs"
                    Icon={FaPhone}
                    isFullWidth
                    activePaths={['/call-details', '/data-refunds']}
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <SidebarButton
                    link="/settings"
                    label="Settings"
                    Icon={FaCog}
                    isFullWidth
                  />
                  {user && (
                    <li className="relative">
                      <button
                        className="relative text-md group flex items-center gap-x-3 rounded-md p-2 font-semibold text-gray-700 hover:text-flair-700 focus:outline-none"
                        onClick={() => setShowSignOutButton(!showSignOutButton)}
                      >
                        <FaUser
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {user?.email}
                      </button>
                      {showSignOutButton && (
                        <div className="absolute right-0 bottom-6 w-full bg-white border border-gray-200 rounded-md shadow-lg py-1">
                          <button
                            onClick={handleSignOut}
                            className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-flair-50 hover:text-flair-700"
                          >
                            Sign out
                          </button>
                        </div>
                      )}
                    </li>
                  )}
                </div>
              </ul>
            </nav>
          </div>
        </div>
        <div className="col-start-2 row-span-2 row-start-1 overflow-hidden">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
