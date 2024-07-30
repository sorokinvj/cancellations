// file: components/RequestsTable/RequestRow.tsx
import React from 'react';
import { Row, flexRender } from '@tanstack/react-table';
import { Request } from '@/lib/db/schema';
import { useForm, FormProvider } from 'react-hook-form';
import { CustomColumnMeta } from '@/constants/app.types';
import clsx from 'clsx';

interface RequestRowProps {
  row: Row<Request>;
}

const RequestRow: React.FC<RequestRowProps> = ({ row }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <tr className="border-b border-gray-200">
        {row.getVisibleCells().map(cell => {
          const meta = cell.column.columnDef.meta as CustomColumnMeta;
          const isHighlightable = meta?.isHighlightable;
          const width = cell.column.getSize();
          const cellClassName = clsx(`p-4 whitespace-nowrap text-left`, {
            'bg-yellow-50': isHighlightable,
          });
          return (
            <td
              key={cell.id}
              className={cellClassName}
              style={{ minWidth: `${width}px` }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    </FormProvider>
  );
};

export default RequestRow;
