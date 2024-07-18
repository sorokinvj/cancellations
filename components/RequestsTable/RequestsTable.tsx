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
} from '@tanstack/react-table';
import { useAuth } from '@/hooks/useAuth';

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

const RequestsTable: FC<Props> = ({ requests }) => {
  const { userData } = useAuth();
  const isProviderUser = userData?.tenantType === 'provider';
  // const { data } = useFirebase({
  //   collectionName: 'users',
  // });

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Submitted by',
      accessorKey: 'submittedBy',
    },
    {
      header: 'Request Type',
      accessorKey: 'requestType',
    },
    {
      header: 'Date Submitted',
      accessorKey: 'dateSubmitted',
    },
    {
      header: 'Date Responded',
      accessorKey: 'dateResponded',
    },
    {
      header: 'Proxy Tenant ID',
      accessorKey: 'proxyTenantId',
    },
    ...(isProviderUser
      ? [
          {
            header: 'Source',
            accessorKey: 'proxyTenantId',
          },
        ]
      : []),
    {
      header: 'Customer Name',
      accessorKey: 'customerName',
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
            Report Selected
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
