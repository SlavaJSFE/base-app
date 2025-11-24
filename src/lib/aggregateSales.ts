import type { SalesRecord } from '@src/features/sales/types/sales';

export function aggregateSales<Key extends string>(
  data: SalesRecord[],
  getKey: (item: SalesRecord) => string | undefined,
  keyField: Key,
): Array<{ [K in Key]: string } & { sales: number }> {
  const result = data.reduce<Record<string, { [K in Key]: string } & { sales: number }>>(
    (acc, item) => {
      const key = getKey(item)?.trim() || 'Unknown';

      if (!acc[key]) {
        acc[key] = { [keyField]: key, sales: 0 } as { [K in Key]: string } & { sales: number };
      }
      acc[key].sales += item.sum_sales;

      return acc;
    },
    {},
  );

  return Object.values(result);
}
