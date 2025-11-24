import { cn } from '@src/lib/utils';
import type { Table } from '@tanstack/react-table';

type RangeFilterProps<Type> = {
  table: Table<Type>;
  columnName: string;
  type: 'date' | 'number';
  labelFrom: string;
  labelTo: string;
  parseValue: (raw: string) => number | undefined;
  min?: number;
  hideArrows?: boolean;
};

export function RangeFilter<Type>({
  table,
  columnName,
  type,
  labelFrom,
  labelTo,
  parseValue,
  min,
  hideArrows,
}: RangeFilterProps<Type>) {
  const column = table.getColumn(columnName);

  return (
    <div className="flex gap-4">
      <label className="flex flex-col">
        <span className="text-sm mb-1">{labelFrom}</span>
        <input
          type={type}
          min={type === 'number' ? (min ?? 0) : undefined}
          className={cn(
            'border rounded px-2 py-1',
            hideArrows &&
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          )}
          onChange={(event) => {
            const from = parseValue(event.target.value);
            const existing = column?.getFilterValue() as [number, number] | undefined;
            column?.setFilterValue([from, existing?.[1]]);
          }}
        />
      </label>
      <label className="flex flex-col">
        <span className="text-sm mb-1">{labelTo}</span>
        <input
          type={type}
          className={cn(
            'border rounded px-2 py-1',
            hideArrows &&
              '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
          )}
          onChange={(event) => {
            const to = parseValue(event.target.value);
            const existing = column?.getFilterValue() as [number, number] | undefined;
            column?.setFilterValue([existing?.[0], to]);
          }}
        />
      </label>
    </div>
  );
}
