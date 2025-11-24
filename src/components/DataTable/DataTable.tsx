import { cn } from '@lib/utils';
import { flexRender, type Table } from '@tanstack/react-table';

type DataTableProps<Type> = {
  table: Table<Type>;
  withSorting?: boolean;
  className?: string;
};

export default function DataTable<Type>({
  table,
  withSorting = false,
  className,
}: DataTableProps<Type>) {
  return (
    <table className={cn('w-full text-sm border-collapse', className)}>
      <thead className="border-b">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const sorted = header.column.getIsSorted() as string | null;

              return (
                <th
                  key={header.id}
                  onClick={withSorting ? header.column.getToggleSortingHandler() : undefined}
                  className={cn(
                    'text-left py-2 font-medium text-muted-foreground select-none',
                    withSorting && 'cursor-pointer',
                  )}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {withSorting && (sorted === 'asc' ? ' ↑' : sorted === 'desc' ? ' ↓' : null)}
                </th>
              );
            })}
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
  );
}
