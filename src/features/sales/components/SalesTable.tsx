import { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';

import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import type { SalesRecord } from '../types/sales';
import Filters from './Filters';
import Pagination from '@components/Pagination/Pagination';
import DataTable from '@components/DataTable/DataTable';

interface SalesTableProps {
  data: SalesRecord[];
  channelTypes: string[];
  channelNames: string[];
}

const columnHelper = createColumnHelper<SalesRecord>();

export function SalesTable({ data, channelTypes, channelNames }: SalesTableProps) {
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
        <Filters table={table} channelTypes={channelTypes} channelNames={channelNames} />
        <DataTable table={table} withSorting />
        <Pagination table={table} />
      </CardContent>
    </Card>
  );
}
