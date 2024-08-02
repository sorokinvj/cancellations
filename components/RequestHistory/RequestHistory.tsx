// file: components/RequestDetails/RequestHistory.tsx
import React from 'react';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { RequestWithLog, RequestChange } from '@/lib/db/schema';
import Spinner from '../ui/spinner';

interface RequestHistoryProps {
  request: RequestWithLog | undefined;
  isLoading?: boolean;
}

const RequestHistory: React.FC<RequestHistoryProps> = ({
  request,
  isLoading,
}) => {
  const timelineItems: TimelineItem[] = React.useMemo(() => {
    if (!request) return [];

    const items: TimelineItem[] = request.log.changes.map(
      (change: RequestChange, index: number) => ({
        id: `${change.updatedAt}-${index}`,
        content: (
          <div>
            <h4 className="font-bold">{change.field}</h4>
            <p>From: {change.oldValue?.toString() ?? 'Not set'}</p>
            <p>To: {change.newValue?.toString() ?? 'Not set'}</p>
            <p>By: {change.changedBy.email}</p>
          </div>
        ),
        date: new Date(change.updatedAt).toLocaleString(),
        side: change.changedBy.tenantType === 'proxy' ? 'left' : 'right',
        color: change.changedBy.tenantType === 'proxy' ? 'blue' : 'green',
      }),
    );

    // Add the initial "Request created" item
    items.unshift({
      id: 'request-created',
      content: (
        <div>
          <h4 className="font-bold">Request Created</h4>
          <p>By: {request.submittedBy}</p>
          <p>For: {request.providerTenantId}</p>
        </div>
      ),
      date: new Date(request.dateSubmitted).toLocaleString(),
      side: 'left',
      color: 'blue',
    });

    return items;
  }, [request]);

  if (!request) {
    return <div>No history available</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold">Request History</h2>
      {isLoading ? (
        <Spinner className="w-12 " color="blue" />
      ) : (
        <Timeline items={timelineItems} />
      )}
    </div>
  );
};

export default RequestHistory;
