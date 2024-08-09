import { RequestStatus as RequestStatusType } from '@/lib/db/schema';

const RequestStatus = ({ status }: { status: RequestStatusType }) => {
  const colorMap: Record<RequestStatusType, string> = {
    Pending: 'bg-sky-100 text-sky-800',
    Canceled: 'bg-green-100 text-green-800',
    Declined: 'bg-red-100 text-red-800',
    'Save Offered': 'bg-amber-100 text-amber-600',
    'Save Declined': 'bg-amber-100 text-amber-400',
    'Save Accepted': 'bg-amber-100 text-amber-500',
    'Save Confirmed': 'bg-amber-100 text-amber-800',
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[status] ?? ''}`}
    >
      {status}
    </span>
  );
};

export default RequestStatus;
