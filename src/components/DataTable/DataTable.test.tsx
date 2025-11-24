import { render, screen, fireEvent } from '@testing-library/react';
import type { Table, Column, HeaderGroup, Row, Cell, Header } from '@tanstack/react-table';
import DataTable from './DataTable';

type TestRow = { name: string; value: number };

function createMockTable(sorted: 'asc' | 'desc' | null = null): Table<TestRow> {
  const toggleSortingHandler = vi.fn();

  const mockColumn: Partial<Column<TestRow>> = {
    columnDef: {
      accessorKey: 'name',
      header: () => 'Name',
      cell: (ctx) => ctx.getValue(),
    },
    getIsSorted: vi.fn().mockReturnValue(sorted),
    getToggleSortingHandler: vi.fn().mockReturnValue(toggleSortingHandler),
  };

  const mockHeader: Partial<Header<TestRow, unknown>> = {
    id: 'header-1',
    column: mockColumn as Column<TestRow>,
    getContext: vi.fn(),
  };

  const mockHeaderGroup = {
    id: 'group-1',
    headers: [mockHeader],
  } as unknown as HeaderGroup<TestRow>;

  const mockCell: Partial<Cell<TestRow, unknown>> = {
    id: 'cell-1',
    column: mockColumn as Column<TestRow>,
    getContext: vi.fn().mockReturnValue({ getValue: () => 'Alice' }),
  };

  const mockRow: Partial<Row<TestRow>> = {
    id: 'row-1',
    getVisibleCells: vi.fn().mockReturnValue([mockCell as Cell<TestRow, unknown>]),
  };

  const mockTable: Partial<Table<TestRow>> = {
    getHeaderGroups: vi.fn().mockReturnValue([mockHeaderGroup as HeaderGroup<TestRow>]),
    getRowModel: vi.fn().mockReturnValue({ rows: [mockRow as Row<TestRow>] }),
  };

  return mockTable as Table<TestRow>;
}

describe('DataTable component', () => {
  it('renders headers and rows', () => {
    const table = createMockTable();
    render(<DataTable table={table} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('adds cursor-pointer and sorting handler when withSorting=true', () => {
    const table = createMockTable();
    render(<DataTable table={table} withSorting />);

    const header = screen.getByText('Name');
    expect(header.className).toContain('cursor-pointer');

    fireEvent.click(header);
    const column = table.getHeaderGroups()[0].headers[0].column;
    expect(column?.getToggleSortingHandler).toHaveBeenCalled();
  });

  it('does not add cursor-pointer when withSorting=false', () => {
    const table = createMockTable();
    render(<DataTable table={table} withSorting={false} />);

    const header = screen.getByText('Name');
    expect(header.className).not.toContain('cursor-pointer');
  });

  it('shows asc arrow when sorted asc', () => {
    const table = createMockTable('asc');
    render(<DataTable table={table} withSorting />);

    expect(screen.getByText(/↑/)).toBeInTheDocument();
  });

  it('shows desc arrow when sorted desc', () => {
    const table = createMockTable('desc');
    render(<DataTable table={table} withSorting />);

    expect(screen.getByText(/↓/)).toBeInTheDocument();
  });

  it('applies custom className to table', () => {
    const table = createMockTable();
    render(<DataTable table={table} className="custom-class" />);

    const tableEl = screen.getByRole('table');
    expect(tableEl.className).toContain('custom-class');
  });
});
