import { useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import type { SalesRecord } from '../types/SalesRecord';
import type { Table } from '@tanstack/react-table';

export type FiltersProps = {
  table: Table<SalesRecord>;
  data: SalesRecord[];
};

export default function Filters({ table, data }: FiltersProps) {
  const uniqueChannelTypes = useMemo(
    () => Array.from(new Set(data.map((record) => record.channel_type))),
    [data],
  );
  const uniqueChannelNames = useMemo(
    () => Array.from(new Set(data.map((record) => record.channel_name?.trim()))),
    [data],
  );

  return (
    <div className="flex flex-wrap items-end gap-4 mb-4">
      <div className="flex flex-col">
        <label className="text-sm mb-1">Date from</label>
        <input
          type="date"
          className="border rounded px-2 py-1"
          onChange={(event) => {
            const from = event.target.value ? new Date(event.target.value).getTime() : undefined;
            const existing = table.getColumn('dateValue')?.getFilterValue() as
              | [number, number]
              | undefined;
            table.getColumn('dateValue')?.setFilterValue([from, existing?.[1]]);
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Date to</label>
        <input
          type="date"
          className="border rounded px-2 py-1"
          onChange={(event) => {
            const to = event.target.value ? new Date(event.target.value).getTime() : undefined;
            const existing = table.getColumn('dateValue')?.getFilterValue() as
              | [number, number]
              | undefined;
            table.getColumn('dateValue')?.setFilterValue([existing?.[0], to]);
          }}
        />
      </div>
      <Select
        onValueChange={(value) =>
          table.getColumn('channel_type')?.setFilterValue(value === 'all' ? '' : value)
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Channel type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {uniqueChannelTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type || '—'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          table.getColumn('channel_name')?.setFilterValue(value === 'all' ? '' : value)
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Channel name" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {uniqueChannelNames.map((name) => (
            <SelectItem key={name || '—'} value={name || '—'}>
              {name || '—'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Min sales</label>
        <input
          type="number"
          min={0}
          className="border rounded px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          onChange={(event) => {
            const min = event.target.value ? Number(event.target.value) : undefined;
            const existing = table.getColumn('sum_sales')?.getFilterValue() as
              | [number, number]
              | undefined;
            table.getColumn('sum_sales')?.setFilterValue([min, existing?.[1]]);
          }}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm mb-1">Max sales</label>
        <input
          type="number"
          className="border rounded px-2 py-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          onChange={(event) => {
            const max = event.target.value ? Number(event.target.value) : undefined;
            const existing = table.getColumn('sum_sales')?.getFilterValue() as
              | [number, number]
              | undefined;
            table.getColumn('sum_sales')?.setFilterValue([existing?.[0], max]);
          }}
        />
      </div>
    </div>
  );
}
