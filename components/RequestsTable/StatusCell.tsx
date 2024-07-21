import { Request, RequestStatus } from '@/lib/db/schema';
import { Cell } from '@tanstack/react-table';

const StatusCell = ({ cell }: { cell: Cell<Request, RequestStatus> }) => {
  const status = cell.getValue();
  const colorMap = {
    Pending: 'bg-sky-100 text-sky-800',
    Canceled: 'bg-green-100 text-green-800',
    Declined: 'bg-red-100 text-red-800',
    'Rescue Attempt': 'bg-amber-100 text-amber-800',
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusCell;
