// file: components/RequestsTable/RequestRow.tsx
import React from 'react';
import { Row, flexRender } from '@tanstack/react-table';
import { Request } from '@/lib/db/schema';
import { useForm, FormProvider } from 'react-hook-form';

interface RequestRowProps {
  row: Row<Request>;
}

const RequestRow: React.FC<RequestRowProps> = ({ row }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <tr className="border-b border-gray-200">
        {row.getVisibleCells().map(cell => (
          <td key={cell.id} className="p-4 whitespace-nowrap">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    </FormProvider>
  );
};

export default RequestRow;
