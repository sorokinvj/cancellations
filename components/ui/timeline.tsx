// file: components/Timeline/Timeline.tsx
import React from 'react';

export interface TimelineItem {
  id: string;
  content: React.ReactNode;
  date: string;
  side: 'left' | 'right';
  color: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

      {items.map(item => (
        <div
          key={item.id}
          className={`flex items-center mb-8 ${item.side === 'left' ? 'flex-row-reverse' : ''}`}
        >
          <div
            className={`flex-1 ${item.side === 'left' ? 'text-right pr-4' : 'pl-4'}`}
          >
            <div className="p-4 bg-white rounded shadow">
              {item.content}
              <div className="mt-2 text-sm text-gray-500">{item.date}</div>
            </div>
          </div>
          <div
            className={`w-4 h-4 rounded-full bg-${item.color}-500 border-4 border-white z-10`}
          />
          <div className="flex-1"></div>
        </div>
      ))}
    </div>
  );
};
