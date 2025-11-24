import type { SalesRecord } from '../types/sales';
import type { Table } from '@tanstack/react-table';
import NameFilter from '@components/NameFilter/NameFilter';
import { RangeFilter } from '@src/components/RangeFilter/RangeFilter';

export type FiltersProps = {
  table: Table<SalesRecord>;
  channelTypes: string[];
  channelNames: string[];
};

export default function Filters({ table, channelTypes, channelNames }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 mb-4">
      <RangeFilter
        table={table}
        columnName="dateValue"
        type="date"
        labelFrom="Date from"
        labelTo="Date to"
        parseValue={(raw) => (raw ? new Date(raw).getTime() : undefined)}
      />
      <NameFilter
        table={table}
        columnName={'channel_type'}
        placeholder={'Channel type'}
        filterList={channelTypes}
      />
      <NameFilter
        table={table}
        columnName="channel_name"
        placeholder="Channel name"
        filterList={channelNames}
      />
      <RangeFilter
        table={table}
        columnName="sum_sales"
        type="number"
        labelFrom="Min Sales"
        labelTo="Max sales"
        parseValue={(raw) => (raw ? Number(raw) : undefined)}
        min={0}
        hideArrows
      />
    </div>
  );
}
