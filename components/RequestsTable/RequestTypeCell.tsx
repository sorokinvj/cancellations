import { Request } from '@/lib/db/schema';
import { Cell } from '@tanstack/react-table';

const StatusCell = ({ cell }: { cell: Cell<Request, 'Cancellation'> }) => {
  const status = cell.getValue();
  const colorMap = {
    Cancellation: 'bg-sky-100 text-sky-800',
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
