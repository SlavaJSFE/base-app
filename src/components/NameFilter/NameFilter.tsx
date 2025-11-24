import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';
import { normalizeName } from '@lib/normalizeName';
import type { Table } from '@tanstack/react-table';

export type NameFilterProps<Type> = {
  table: Table<Type>;
  columnName: string;
  placeholder: string;
  filterList: string[];
};

export default function NameFilter<Type>({
  table,
  columnName,
  filterList,
  placeholder,
}: NameFilterProps<Type>) {
  return (
    <Select
      onValueChange={(value) =>
        table.getColumn(columnName)?.setFilterValue(value === 'all' ? '' : value)
      }
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {filterList.map((name) => {
          const itemName = normalizeName(name);

          return (
            <SelectItem key={itemName} value={itemName}>
              {itemName}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
