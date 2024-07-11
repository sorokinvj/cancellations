'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons/lib';
import { FaChartSimple } from 'react-icons/fa6';
import { FaPhone, FaQuestionCircle, FaCog } from 'react-icons/fa';
import { Toaster } from 'react-hot-toast';
import clsx from 'clsx';

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
  const pathname = usePathname();
  const isFullWidth = pathname !== '/data';

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={clsx(
          'grid h-screen w-screen grid-rows-[64px_1fr]',
          isFullWidth ? 'grid-cols-[20rem_1fr] ' : 'grid-cols-[5rem_1fr] ',
        )}
      >
        <div
          className={clsx(
            'fixed inset-y-0 z-50 flex flex-col',
            isFullWidth ? 'w-[20rem]' : 'w-[5rem]',
          )}
        >
          <div className="flex grow flex-col border-r border-gray-200 bg-white px-6">
            {isFullWidth ? (
              <img
                src="/images/proxz.png"
                className="mt-4 w-[100px]"
                alt="Proxz logo"
              />
            ) : (
              <img
                src="/images/proxz-p.png"
                className="mt-4 w-[30px]"
                alt="Proxz icon"
              />
            )}

            <nav className="mt-3 flex flex-1 flex-col">
              <ul
                role="list"
                className="flex flex-1 flex-col gap-y-5 justify-between pb-4"
              >
                <li>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    <SidebarButton
                      link="/"
                      label="Overview"
                      Icon={FaChartSimple}
                      activePaths={[
                        '/overview-customer-support',
                        '/overview-refunds',
                      ]}
                      isFullWidth={isFullWidth}
                    />
                    <SidebarButton
                      link="/data"
                      label="Call Logs"
                      Icon={FaPhone}
                      isFullWidth={isFullWidth}
                      activePaths={['/call-details', '/data-refunds']}
                    />
                  </ul>
                </li>

                <li className="space-y-1 border-t">
                  <ul role="list" className="-mx-2 mt-3 space-y-1">
                    <SidebarButton
                      link="/settings"
                      label="Settings"
                      Icon={FaCog}
                      isFullWidth={isFullWidth}
                    />
                  </ul>
                </li>
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
