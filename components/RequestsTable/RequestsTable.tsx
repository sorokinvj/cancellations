// file: components/RequestsTable/RequestsTable.tsx
'use client';
import { FC } from 'react';
import { Request } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { IoIosPaper } from 'react-icons/io';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  Cell,
} from '@tanstack/react-table';
import { useAuth } from '@/hooks/useAuth';
import StatusCell from './StatusCell';
import RequestTypeCell from './RequestTypeCell';
import { formatDate } from '@/utils/helpers';
import { User, Network } from 'lucide-react';
import { Radio, RadioGroup, RadioField } from '@/components/ui/radio';
import useFirebase from '@/hooks/useFirebase';
import Spinner from '../ui/spinner';

interface Props {
  requests: Request[];
}

// id: string;
// version: number;
// status: 'Pending' | 'Canceled' | 'Declined' | 'Rescue Attempt';
// submittedBy: string;
// requestType: string;
// dateSubmitted: Date;
// dateResponded: Date | null;
// proxyTenantId: string;
// providerTenantId: string;
// customerName: string;
// customerEmail: string;
// accountNumber: string;
// lastFourCCDigits: string;
// successfullyResolved: boolean;
// rescueOffer: string | null;
// rescueOfferText: string | null;
// declineReason: string | null;
// notes: string | null;

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

  return (
    <RadioGroup defaultValue={resolved ? 'Yes' : 'No'} className="flex gap-4">
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

const RequestsTable: FC<Props> = ({ requests }) => {
  const { userData } = useAuth();
  const isProviderUser = userData?.tenantType === 'provider';

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: StatusCell,
    },
    {
      header: 'Submitted by',
      accessorKey: 'submittedBy',
    },
    {
      header: 'Request Type',
      accessorKey: 'requestType',
      cell: RequestTypeCell,
    },
    {
      header: 'Date Submitted',
      accessorKey: 'dateSubmitted',
      cell: DateCell,
    },
    {
      header: 'Date Responded',
      accessorKey: 'dateResponded',
      cell: DateCell,
    },
    ...(isProviderUser
      ? [
          {
            header: 'Source',
            accessorKey: 'proxyTenantId',
            cell: SourceCell,
          },
        ]
      : []),
    {
      header: 'Customer Name',
      accessorKey: 'customerName',
      cell: UsernameCell,
    },
    {
      header: 'Customer Email',
      accessorKey: 'customerEmail',
    },
    {
      header: 'Account Number',
      accessorKey: 'accountNumber',
    },
    {
      header: 'Last 4 CC Digits',
      accessorKey: 'lastFourCCDigits',
    },
    {
      header: 'Successfully Resolved',
      accessorKey: 'successfullyResolved',
      cell: ResolveCell,
    },
    {
      header: 'Rescue Offer',
      accessorKey: 'rescueOffer',
    },
    {
      header: 'Decline Reason',
      accessorKey: 'declineReason',
    },
    {
      header: 'Notes',
      accessorKey: 'notes',
    },
    {
      id: 'Actions',
      cell: () => (
        <div className="flex items-center gap-2">
          <Button
            outline={true}
            className="flex items-center whitespace-nowrap"
          >
            <IoIosPaper />
            Report
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table>
        <thead className="border-b border-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="p-4 whitespace-nowrap text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b border-gray-200">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
