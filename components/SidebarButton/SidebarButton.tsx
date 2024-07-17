'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

type Props = {
  link: string;
  label: string;
  Icon: IconType;
  activePaths?: string[];
  hideButton?: boolean;
};

const SidebarButton: React.FC<Props> = ({
  link,
  label,
  Icon,
  activePaths,
  hideButton,
}) => {
  const pathname = usePathname();
  const isActive =
    link === pathname ||
    activePaths?.includes(pathname) ||
    activePaths?.includes('/' + pathname.split('/')[1]);

  if (hideButton) return null;

  return (
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
        <>{label}</>
      </div>
    </Link>
  );
};

export default SidebarButton;
