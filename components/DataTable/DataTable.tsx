/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { TbCaretUpDownFilled } from 'react-icons/tb';

export interface ColumnDef<T extends any[]> {
  key: Extract<keyof T[number], string>;
  title: string;
  render?: (item: T[number]) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface GenericTableProps<T extends any[]> {
  data: T;
  columns: ColumnDef<T>[];
  keyExtractor: (item: T[number]) => string;
  onRowClick?: (item: T[number]) => void;
  onSort?: (key: string) => void;
  selectable?: boolean;
  selectedItems?: Set<string>;
  onSelectionChange?: (selectedKeys: Set<string>) => void;
  wFull?: boolean;
  className?: string;
}

function DataTable<T extends Record<string, unknown>[]>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  onSort,
  selectable,
  selectedItems,
  onSelectionChange,
  wFull = true,
  className,
}: GenericTableProps<T>) {
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (onSelectionChange) {
      const newSelection: Set<string> = checked
        ? new Set(data.map(item => keyExtractor(item)))
        : new Set();
      onSelectionChange(newSelection);
    }
  };

  const handleSelectRow = (item: T[number], checked: boolean) => {
    if (onSelectionChange && selectedItems) {
      const newSelection = new Set(selectedItems);
      if (checked) {
        newSelection.add(keyExtractor(item));
      } else {
        newSelection.delete(keyExtractor(item));
      }
      onSelectionChange(newSelection);
    }
  };

  return (
    <Table wFull={wFull} className={className}>
      <TableHead>
        <TableRow>
          {selectable && (
            <TableHeader>
              <Checkbox
                checked={selectAll}
                onChange={checked => handleSelectAll(checked)}
              />
            </TableHeader>
          )}
          {columns.map(column => (
            <TableHeader
              key={column.key}
              onClick={() => column.sortable && onSort && onSort(column.key)}
              style={{
                width: column.width,
                cursor: column.sortable ? 'pointer' : 'default',
              }}
            >
              {column.title}
              {column.sortable && (
                <TbCaretUpDownFilled className="ml-1 inline-block shrink-0 text-zinc-200" />
              )}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(item => (
          <TableRow
            key={keyExtractor(item)}
            onClick={() => onRowClick && onRowClick(item)}
            className="hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%] cursor-pointer"
          >
            {selectable && (
              <TableCell onClick={e => e.stopPropagation()}>
                <Checkbox
                  checked={selectedItems?.has(keyExtractor(item))}
                  onChange={checked => handleSelectRow(item, checked)}
                />
              </TableCell>
            )}
            {columns.map(column => (
              <TableCell key={column.key}>
                {column.render ? column.render(item) : String(item[column.key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DataTable;
