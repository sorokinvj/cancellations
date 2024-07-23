import { formatDate } from '@/utils/helpers';
import { User, Network } from 'lucide-react';
import { Radio, RadioGroup, RadioField } from '@/components/ui/radio';
import useFirebase from '@/hooks/useFirebase';
import Spinner from '../ui/spinner';
import { Cell } from '@tanstack/react-table';
import { Request } from '@/lib/db/schema';

const DateCell = ({ cell }: { cell: Cell<Request, string> }) => {
  const date = cell.getValue();
  return formatDate(date);
};

const UsernameCell = ({ cell }: { cell: Cell<Request, string> }) => {
  const username = cell.getValue();
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center w-8 h-8 bg-pink-400 rounded-full">
        <User size={16} className="text-white" />
      </div>
      <span>{username}</span>
    </div>
  );
};

const ResolveCell = ({ cell }: { cell: Cell<Request, boolean> }) => {
  const resolved = cell.getValue();
  console.log(resolved);
  return (
    <RadioGroup className="flex gap-4">
      {['Yes', 'No'].map(value => (
        <RadioField key={value} className="flex items-center gap-2">
          <Radio value={value} color="blue" />
          <label className="text-sm">{value}</label>
        </RadioField>
      ))}
    </RadioGroup>
  );
};

const SourceCell = ({ cell }: { cell: Cell<Request, boolean> }) => {
  const proxyTenantId = cell.getValue();
  const { data: proxiesData, loading: proxiesLoading } = useFirebase({
    collectionName: 'tenants',
    filterBy: 'type',
    filterValue: 'proxy',
  });

  const proxy = proxiesData?.find(proxy => proxy.id === proxyTenantId);

  if (proxiesLoading) return <Spinner className="p-2" />;

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center w-8 h-8 bg-blue-400 rounded-full">
        <Network size={16} className="text-white" />
      </div>
      <span>{proxy?.name}</span>
    </div>
  );
};

export { DateCell, UsernameCell, ResolveCell, SourceCell };
