// file: components/RequestsTable/RequestsTable.tsx
'use client';
import { FC } from 'react';
import { Request, RequestStatus as RequestStatusType } from '@/lib/db/schema';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  Row,
  Cell,
} from '@tanstack/react-table';
import { useAuth } from '@/hooks/useAuth';
import {
  DateCell,
  ResolveCell,
  RequestTypeCell,
  DeclineReasonCell,
  TenantCell,
} from './Cell';
import EmptyRequestsState from './EmptyTable';
import ReportButton from './ReportButton';
import RequestRow from './Row';
import useFirebase from '@/hooks/useFirebase';
import { generateCustomerInfoColumns } from './table.utils';
import { CustomColumnMeta } from '@/constants/app.types';
import clsx from 'clsx';
import Link from 'next/link';
import RequestStatus from '../RequestStatus/RequestStatus';

interface Props {
  requests: Request[];
}

const RequestsTable: FC<Props> = ({ requests }) => {
  const { userData } = useAuth();
  const isProviderUser = userData?.tenantType === 'provider';
  const { data: tenants, loading: tenantsLoading } = useFirebase({
    collectionName: 'tenants',
  });

  const customerInfoColumns = generateCustomerInfoColumns(requests);
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
      cell: ({ cell }: { cell: Cell<Request, string> }) => (
        <Link
          href={`/requests/${cell.getValue()}`}
          className="text-blue-600 underline decoration-blue-600/50 hover:decoration-blue-600 dark:text-blue-400 dark:decoration-blue-400/50 dark:hover:decoration-blue-400"
        >
          {cell.getValue()}
        </Link>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ cell }: { cell: Cell<Request, RequestStatusType> }) => (
        <RequestStatus status={cell.getValue()} />
      ),
      size: 130,
    },
    {
      header: isProviderUser ? 'Source' : 'Destination',
      accessorKey: isProviderUser ? 'proxyTenantId' : 'providerTenantId',
      cell: ({ cell }: { cell: Cell<Request, string> }) => {
        const name = tenants?.find(
          tenant => tenant.id === cell.getValue(),
        )?.name;
        return <TenantCell name={name} isLoading={tenantsLoading} />;
      },
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
    ...customerInfoColumns,
    ...(isProviderUser
      ? [
          {
            header: 'Successfully Resolved',
            accessorKey: 'successfullyResolved',
            cell: ResolveCell,
          },
        ]
      : []),
    {
      header: 'Decline Reason',
      accessorKey: 'declineReason',
      cell: ({
        getValue,
        cell,
      }: {
        getValue: () => string;
        cell: Cell<Request, string>;
      }) => (isProviderUser ? <DeclineReasonCell cell={cell} /> : getValue()),
    },
    ...(isProviderUser
      ? [
          {
            id: 'Actions',
            cell: ({ row }: { row: Row<Request> }) => (
              <ReportButton request={row.original} />
            ),
          },
        ]
      : []),
  ];

  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (requests.length === 0) {
    return <EmptyRequestsState />;
  }

  return (
    <div className="overflow-x-auto h-full">
      <table className="w-full border-collapse table-auto">
        <thead className="border-b border-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const meta = header.column.columnDef.meta as CustomColumnMeta;
                const isHighlightable = meta?.isHighlightable;
                const width = header.column.getSize();
                const headerClassName = clsx(
                  `p-4 whitespace-nowrap text-left`,
                  {
                    'bg-yellow-50': isHighlightable,
                  },
                );
                return (
                  <th
                    key={header.id}
                    className={headerClassName}
                    style={{ minWidth: `${width}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <RequestRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
