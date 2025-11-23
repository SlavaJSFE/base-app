import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import type { SalesRecord } from '../types/SalesRecord';
import Filters from './Filters';
import Pagination from '@components/Pagination/Pagination';

interface SalesTableProps {
  data: SalesRecord[];
}

const columnHelper = createColumnHelper<SalesRecord>();

export function SalesTable({ data }: SalesTableProps) {
  if (!data || data.length === 0) return null;

  const columns = [
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => info.getValue(),
      filterFn: 'inNumberRange',
    }),

    columnHelper.accessor((row) => new Date(row.date).getTime(), {
      id: 'dateValue',
      header: 'DateValueHidden',
      filterFn: 'inNumberRange',
      enableHiding: true,
    }),

    columnHelper.accessor('channel_type', {
      header: 'Channel Type',
      cell: (info) => info.getValue(),
      filterFn: 'equalsString',
    }),

    columnHelper.accessor('channel_name', {
      header: 'Channel',
      cell: (info) => info.getValue() || '—',
      filterFn: 'equalsString',
    }),

    columnHelper.accessor('sum_sales', {
      header: 'Sales (PLN)',
      cell: (info) => info.getValue().toFixed(2),
      filterFn: 'inNumberRange',
    }),

    columnHelper.accessor('count_orders', {
      header: 'Count Orders',
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor('order_status_id', {
      header: 'Status ID',
      cell: (info) => info.getValue(),
    }),
  ];

  const parsedData = useMemo(
    () =>
      data.map((record) => ({
        ...record,
        channel_name: record.channel_name || '—',
        dateValue: new Date(record.date).getTime(),
      })),
    [data],
  );

  const table = useReactTable({
    data: parsedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSorting: true,
    initialState: {
      pagination: { pageSize: 10 },
      sorting: [],
      columnVisibility: {
        dateValue: false,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnFilters: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Result List</CardTitle>
      </CardHeader>
      <CardContent>
        <Filters table={table} data={data} />
        <table className="w-full text-sm border-collapse">
          <thead className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="text-left py-2 font-medium text-muted-foreground cursor-pointer select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination table={table} />
      </CardContent>
    </Card>
  );
}
