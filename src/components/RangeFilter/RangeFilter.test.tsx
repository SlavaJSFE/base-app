import { render, screen, fireEvent } from '@testing-library/react';
import RangeFilter from './RangeFilter';
import type { Table, Column } from '@tanstack/react-table';

type TestRow = { sum_sales: number; date: string };

function createMockTable(): Table<TestRow> {
  const setFilterValue: (updater: unknown) => void = vi.fn();
  const getFilterValue: () => unknown = vi.fn();

  const mockColumn: Partial<Column<TestRow>> = {
    setFilterValue,
    getFilterValue,
  };

  const mockTable: Partial<Table<TestRow>> = {
    getColumn: vi.fn().mockReturnValue(mockColumn as Column<TestRow>),
  };

  return mockTable as Table<TestRow>;
}

describe('RangeFilter component', () => {
  it('renders labels correctly', () => {
    const table = createMockTable();

    render(
      <RangeFilter
        table={table}
        columnName="sum_sales"
        type="number"
        labelFrom="Min sales"
        labelTo="Max sales"
        parseValue={(raw) => (raw ? Number(raw) : undefined)}
      />,
    );

    expect(screen.getByText('Min sales')).toBeInTheDocument();
    expect(screen.getByText('Max sales')).toBeInTheDocument();
  });

  it('calls setFilterValue with parsed min value', () => {
    const table = createMockTable();
    const column = table.getColumn('sum_sales')!;
    const setFilterValue = column.setFilterValue as (updater: unknown) => void;

    render(
      <RangeFilter
        table={table}
        columnName="sum_sales"
        type="number"
        labelFrom="Min sales"
        labelTo="Max sales"
        parseValue={(raw) => (raw ? Number(raw) : undefined)}
      />,
    );

    fireEvent.change(screen.getByLabelText('Min sales'), {
      target: { value: '100' },
    });

    expect(setFilterValue).toHaveBeenCalledWith([100, undefined]);
  });

  it('calls setFilterValue with parsed max value', () => {
    const table = createMockTable();
    const column = table.getColumn('sum_sales')!;
    const setFilterValue = column.setFilterValue as (updater: unknown) => void;

    render(
      <RangeFilter
        table={table}
        columnName="sum_sales"
        type="number"
        labelFrom="Min sales"
        labelTo="Max sales"
        parseValue={(raw) => (raw ? Number(raw) : undefined)}
      />,
    );

    fireEvent.change(screen.getByLabelText('Max sales'), {
      target: { value: '500' },
    });

    expect(setFilterValue).toHaveBeenCalledWith([undefined, 500]);
  });

  it('applies min attribute when type is number', () => {
    const table = createMockTable();

    render(
      <RangeFilter
        table={table}
        columnName="sum_sales"
        type="number"
        labelFrom="Min sales"
        labelTo="Max sales"
        parseValue={(raw) => (raw ? Number(raw) : undefined)}
        min={10}
      />,
    );

    const input = screen.getByLabelText('Min sales') as HTMLInputElement;
    expect(input.min).toBe('10');
  });

  it('adds hideArrows classes when hideArrows is true', () => {
    const table = createMockTable();

    render(
      <RangeFilter
        table={table}
        columnName="sum_sales"
        type="number"
        labelFrom="Min sales"
        labelTo="Max sales"
        parseValue={(raw) => (raw ? Number(raw) : undefined)}
        hideArrows
      />,
    );

    const input = screen.getByLabelText('Min sales');
    expect(input.className).toContain('[appearance:textfield]');
  });
});
