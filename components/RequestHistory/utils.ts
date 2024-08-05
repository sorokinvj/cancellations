import { CustomerInfo, RequestChange } from '@/lib/db/schema';
import { getDisplayHeader } from '../UploadCSV/upload.utils';
import { Request } from '@/lib/db/schema';

export type ChangeGroup = {
  changedBy: string;
  tenantType: 'proxy' | 'provider';
  changes: RequestChange[];
};

type ValueType = CustomerInfo | string | number | boolean | null;

export const groupChanges = (changes: RequestChange[]): ChangeGroup[] => {
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

export const renderHistoryTitle = (group: ChangeGroup): string => {
  const { changedBy, changes } = group;
  const isFirstChange =
    changes.length === 1 &&
    changes[0].field === 'status' &&
    changes[0].newValue === 'Pending';

  if (isFirstChange) {
    return `Request created by ${changedBy}`;
  }

  const declineReasonChange = changes.find(
    change => change.field === 'declineReason',
  );

  if (declineReasonChange) {
    if (
      declineReasonChange.oldValue === null &&
      declineReasonChange.newValue !== null
    ) {
      return `Request declined by ${changedBy}`;
    } else if (
      declineReasonChange.oldValue !== null &&
      declineReasonChange.newValue === null
    ) {
      return `Request issue resolved by ${changedBy}`;
    }
  }

  const successfullyResolvedChange = changes.find(
    change => change.field === 'successfullyResolved',
  );

  if (successfullyResolvedChange && successfullyResolvedChange.newValue) {
    return `Request successfully resolved by ${changedBy}`;
  }
  return `${changes.length} changes made by ${changedBy}`;
};

export const contentMapByField: Partial<
  Record<
    keyof Request,
    (
      oldValue: ValueType,
      newValue: ValueType,
      changes: RequestChange[],
    ) => React.ReactNode
  >
> = {
  customerInfo: () => `Customer info updated`,
  declineReason: (oldValue, newValue, changes) => {
    if (newValue === null && oldValue !== null) {
      const customerInfoChanges = changes.filter(change =>
        change.field.includes('customerInfo.'),
      );
      if (customerInfoChanges.length > 0) {
        const changedFields = customerInfoChanges
          .map(change => {
            const customerFieldChanged = change.field.split('.')[1];
            const newValue =
              typeof change.newValue === 'string' ? change.newValue : 'updated';
            return `${getDisplayHeader(customerFieldChanged)} changed from ${change.oldValue} to ${newValue}`;
          })
          .join(', ');
        return changedFields;
      }
    }
    return `Reason: ${newValue}`;
  },
};
