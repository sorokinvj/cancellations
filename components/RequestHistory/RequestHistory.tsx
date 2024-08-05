// components/RequestHistory/RequestHistory.tsx
import React from 'react';
import { Timeline, TimelineItemProps } from '@/components/ui/timeline';
import { RequestWithLog, RequestChange, CustomerInfo } from '@/lib/db/schema';
import Spinner from '../ui/spinner';
import { Request, RequestStatus as RequestStatusType } from '@/lib/db/schema';
import RequestStatus from '../RequestStatus/RequestStatus';

interface RequestHistoryProps {
  request: RequestWithLog | undefined;
  isLoading?: boolean;
}

type ChangeGroup = {
  changedBy: string;
  tenantType: 'proxy' | 'provider';
  changes: RequestChange[];
};

type ValueType = CustomerInfo | string | number | boolean | null;

const titlesMap: Partial<
  Record<
    keyof Request,
    (oldValue: ValueType, newValue: ValueType) => React.ReactNode
  >
> = {
  customerInfo: () => `Customer info updated`,
  successfullyResolved: (_, newValue) =>
    newValue ? 'Request resolved successfully' : '',
  declineReason: (_, newValue) => `Decline reason: ${newValue}`,
};

const groupChanges = (changes: RequestChange[]): ChangeGroup[] => {
  return changes.reduce((groups: ChangeGroup[], change) => {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.changedBy === change.changedBy.email) {
      lastGroup.changes.push(change);
    } else {
      groups.push({
        changedBy: change.changedBy.email,
        tenantType: change.changedBy.tenantType,
        changes: [change],
      });
    }
    return groups;
  }, []);
};

const createGroupSummary = (group: ChangeGroup): string => {
  const { changedBy, changes } = group;
  if (
    changes.length === 1 &&
    changes[0].field === 'status' &&
    changes[0].newValue === 'Pending'
  ) {
    return `Request created by ${changedBy}`;
  }
  if (changes.some(change => change.field === 'declineReason')) {
    return `Request declined by ${changedBy}`;
  }
  return `${changes.length} changes made by ${changedBy}`;
};

const RequestHistory: React.FC<RequestHistoryProps> = ({
  request,
  isLoading,
}) => {
  const timelineItems: TimelineItemProps[] = React.useMemo(() => {
    if (!request) return [];

    const filteredChanges = request.log.changes.filter(
      change => change.field !== 'dateResponded',
    );
    const groups = groupChanges(filteredChanges);

    return groups.map((group, index) => {
      const statusChange = group.changes.find(
        change => change.field === 'status',
      );
      const otherChanges = group.changes.filter(
        change => change.field !== 'status',
      );

      return {
        id: `${group.changedBy}-${index}`,
        content: (
          <div>
            <h4 className="font-bold">{createGroupSummary(group)}</h4>
            {otherChanges.map((change, changeIndex) => (
              <p key={changeIndex}>
                {titlesMap[change.field as keyof Request]?.(
                  change.oldValue,
                  change.newValue,
                )}
              </p>
            ))}
          </div>
        ),
        status: statusChange ? (
          <RequestStatus status={statusChange.newValue as RequestStatusType} />
        ) : undefined,
        date: new Date(group.changes[0].updatedAt).toLocaleString(),
        side: group.tenantType === 'proxy' ? 'left' : 'right',
        color: group.tenantType === 'proxy' ? 'violet' : 'green',
      };
    });
  }, [request]);

  if (!request) {
    return <div>No history available</div>;
  }

  return (
    <div className="p-4 rounded-lg">
      <h2 className="text-xl font-semibold">Request History</h2>
      {isLoading ? (
        <Spinner className="w-12 " color="blue" />
      ) : (
        <Timeline items={timelineItems} dotAlignment="top" />
      )}
    </div>
  );
};

export default RequestHistory;
