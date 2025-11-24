import type { SalesRecord } from '@src/features/sales/types/sales';
import { aggregateSales } from '../aggregateSales';

describe('aggregateSales', () => {
  const sampleData: SalesRecord[] = [
    {
      date: '2024-09-08',
      channel_type: 'marketplace',
      channel_name: 'Allegro',
      sum_sales: 100,
      order_status_id: 1,
      count_orders: 644,
    },
    {
      date: '2024-09-14',
      channel_type: 'marketplace',
      channel_name: 'Allegro',
      sum_sales: 200,
      order_status_id: 2,
      count_orders: 54,
    },
    {
      date: '2024-09-17',
      channel_type: 'marketplace',
      channel_name: 'Shoper',
      sum_sales: 50,
      order_status_id: 3,
      count_orders: 4,
    },
    {
      date: '2024-09-12',
      channel_type: 'marketplace',
      channel_name: '',
      sum_sales: 75,
      order_status_id: 4,
      count_orders: 33,
    },
  ];

  it('aggregates sales by channel_name', () => {
    const result = aggregateSales(sampleData, (item) => item.channel_name, 'channel_name');

    expect(result).toEqual([
      { channel_name: 'Allegro', sales: 300 },
      { channel_name: 'Shoper', sales: 50 },
      { channel_name: 'Unknown', sales: 75 },
    ]);
  });

  it('aggregates sales by channel_type', () => {
    const result = aggregateSales(sampleData, (item) => item.channel_type, 'channel_type');

    expect(result).toEqual([{ channel_type: 'marketplace', sales: 425 }]);
  });

  it('handles empty data', () => {
    const result = aggregateSales([], (item) => item.channel_name, 'channel_name');
    expect(result).toEqual([]);
  });

  it('trims keys before aggregation', () => {
    const data: SalesRecord[] = [
      { ...sampleData[0], channel_name: ' Allegro ', sum_sales: 100 },
      { ...sampleData[1], channel_name: ' Allegro ', sum_sales: 200 },
    ];

    const result = aggregateSales(data, (item) => item.channel_name, 'channel_name');

    expect(result).toEqual([{ channel_name: 'Allegro', sales: 300 }]);
  });

  it("uses 'Unknown' when key is undefined or empty string", () => {
    const data: SalesRecord[] = [{ ...sampleData[0], channel_name: '', sum_sales: 123 }];

    const result = aggregateSales(data, (item) => item.channel_name, 'channel_name');

    expect(result).toEqual([{ channel_name: 'Unknown', sales: 123 }]);
  });
});
