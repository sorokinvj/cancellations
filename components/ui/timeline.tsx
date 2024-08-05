// components/ui/timeline.tsx
import React from 'react';
import clsx from 'clsx';

export interface TimelineItemProps {
  id: string;
  content: React.ReactNode;
  date: string;
  side: 'left' | 'right';
  borderClass: string;
  status?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItemProps[];
  alternatingSides?: boolean;
  dotAlignment?: 'top' | 'center';
}

const TimelineItem: React.FC<
  TimelineItemProps & { dotAlignment: 'top' | 'center' }
> = ({ content, date, side, borderClass, dotAlignment = 'top', status }) => (
  <div
    className={clsx(
      'flex items-start mb-8',
      side === 'left' ? 'flex-row-reverse' : '',
    )}
  >
    <div
      className={clsx(
        'flex-1 flex flex-col gap-2',
        side === 'left' ? 'text-right pl-4' : 'pr-4',
      )}
    >
      {status && (
        <div
          className={clsx(
            side === 'left' ? 'text-left pl-3' : 'text-right pr-3',
          )}
        >
          {status}
        </div>
      )}
      <div
        className={clsx(
          '',
          side === 'left' ? 'pl-4  text-left' : 'pr-4 text-right',
        )}
      >
        {content}
      </div>
      <div
        className={clsx(
          'text-sm text-gray-500',
          side === 'left' ? 'pl-4 text-left' : 'pr-4 text-right',
        )}
      >
        {date}
      </div>
    </div>
    <div
      className={clsx(
        `w-4 h-4 rounded-full bg-white ${borderClass} border-4 z-10`,
        {
          'self-start mt-1.5': dotAlignment === 'top',
          'self-center': dotAlignment === 'center',
          'mr-4': side === 'right',
          'ml-4': side === 'left',
        },
      )}
    />
    <div className="flex-1" />
  </div>
);

export const Timeline: React.FC<TimelineProps> = ({
  items,
  dotAlignment = 'top',
}) => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2" />
      {items.map(item => (
        <TimelineItem
          key={item.id}
          {...item}
          side={item.side}
          dotAlignment={dotAlignment}
        />
      ))}
    </div>
  );
};
