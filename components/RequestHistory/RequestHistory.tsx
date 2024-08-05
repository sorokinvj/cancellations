// components/RequestHistory/RequestHistory.tsx
import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import { RequestWithLog } from '@/lib/db/schema';
import Spinner from '../ui/spinner';
import clsx from 'clsx';
import { useTimelineItems } from './useTimelineItems';

interface RequestHistoryProps {
  request: RequestWithLog | undefined;
  isLoading?: boolean;
}

const RequestHistory: React.FC<RequestHistoryProps> = ({
  request,
  isLoading,
}) => {
  const { items, titles } = useTimelineItems(request);

  if (!request) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-semibold flex items-center justify-center gap-2 mb-8">
        {isLoading ? 'Request History is loading...' : 'Request History'}
        {isLoading && (
          <Spinner className="w-6 h-6 text-gray-500" color="gray" />
        )}
      </h2>
      <Timeline items={items} dotAlignment="top" titles={titles} />
    </div>
  );
};

export default RequestHistory;
