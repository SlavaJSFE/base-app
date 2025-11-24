import { render, screen, fireEvent } from '@testing-library/react';
import NameFilter from './NameFilter';
import type { Table, Column } from '@tanstack/react-table';

type TestRow = { channel_name: string };

function createMockTable(): Table<TestRow> {
  const setFilterValue: (updater: unknown) => void = vi.fn();

  const mockColumn: Partial<Column<TestRow>> = {
    setFilterValue,
    getFilterValue: vi.fn(),
  };

  const mockTable: Partial<Table<TestRow>> = {
    getColumn: vi.fn().mockReturnValue(mockColumn as Column<TestRow>),
  };

  return mockTable as Table<TestRow>;
}

describe('NameFilter component', () => {
  it('renders placeholder in SelectTrigger', () => {
    const table = createMockTable();

    render(
      <NameFilter
        table={table}
        columnName="channel_name"
        filterList={['Allegro', 'Shoper']}
        placeholder="Select channel"
      />,
    );

    expect(screen.getByText('Select channel')).toBeInTheDocument();
  });

  it("renders 'All' option and filterList items", () => {
    const table = createMockTable();

    render(
      <NameFilter
        table={table}
        columnName="channel_name"
        filterList={['Allegro', 'Unknown']}
        placeholder="Select channel"
      />,
    );

    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Allegro')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it("calls setFilterValue with '' when 'All' is selected", () => {
    const table = createMockTable();
    const column = table.getColumn('channel_name')!;
    const setFilterValue = column.setFilterValue as (updater: unknown) => void;

    render(
      <NameFilter
        table={table}
        columnName="channel_name"
        filterList={['Allegro']}
        placeholder="Select channel"
      />,
    );

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('All'));

    expect(setFilterValue).toHaveBeenCalledWith('');
  });

  it('calls setFilterValue with selected value when specific item is chosen', () => {
    const table = createMockTable();
    const column = table.getColumn('channel_name')!;
    const setFilterValue = column.setFilterValue as (updater: unknown) => void;

    render(
      <NameFilter
        table={table}
        columnName="channel_name"
        filterList={['Allegro']}
        placeholder="Select channel"
      />,
    );

    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Allegro'));

    expect(setFilterValue).toHaveBeenCalledWith('Allegro');
  });

  it("renders only 'All' when filterList is empty", () => {
    const table = createMockTable();

    render(
      <NameFilter
        table={table}
        columnName="channel_name"
        filterList={[]}
        placeholder="Select channel"
      />,
    );

    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.queryByText('Allegro')).not.toBeInTheDocument();
  });
});
