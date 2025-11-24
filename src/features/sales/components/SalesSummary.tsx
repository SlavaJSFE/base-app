import { useMemo } from 'react';
import { type SalesRecord } from '../types/SalesRecord';
import SummaryCard from '@src/components/SummaryCard/SummaryCard';
import { splitArray } from '@src/lib/splitArray';

export type SalesSummaryProps = {
  data: SalesRecord[] | undefined;
};

export function SalesSummary({ data }: SalesSummaryProps) {
  if (!data || data.length === 0) return null;

  const { totalSales, totalOrders, bestDay } = useMemo(
    () =>
      data.reduce(
        (acc, record) => {
          acc.totalSales += record.sum_sales;
          acc.totalOrders += record.count_orders;

          if (!acc.bestDay || record.sum_sales > acc.bestDay.sum_sales) {
            acc.bestDay = record;
          }

          return acc;
        },
        {
          totalSales: 0,
          totalOrders: 0,
          bestDay: { date: '', sum_sales: 0 } as SalesRecord,
        },
      ),
    [data],
  );

  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  const uniqueChannelTypes = new Set(data.map((record) => record.channel_type)).size;
  const uniqueChannelNames = Array.from(
    new Set(data.map((record) => record.channel_name?.trim() || 'Unknown')),
  );
  const { columnLength, columns } = splitArray(uniqueChannelNames, 2);
  const commonContentStyles = 'text-2xl font-bold';

  const summary = [
    {
      title: 'Total Sales',
      content: `${totalSales.toLocaleString()} zł`,
      contentClasses: commonContentStyles,
    },
    {
      title: 'Total Orders',
      content: totalOrders.toLocaleString(),
      contentClasses: commonContentStyles,
    },
    {
      title: 'Avg Order Value',
      content: `${avgOrderValue.toFixed(2)} zł`,
      contentClasses: commonContentStyles,
    },
    {
      title: 'Best Day',
      content: (
        <>
          <div className="text-lg font-semibold">{bestDay.date}</div>
          <div className="text-sm text-muted-foreground">
            {bestDay.sum_sales.toLocaleString()} zł
          </div>
        </>
      ),
    },
    {
      title: 'Channel Types',
      content: uniqueChannelTypes.toLocaleString(),
      contentClasses: commonContentStyles,
    },
    {
      title: 'Channels',
      content: (
        <>
          {columns.map((column, colIndex) => (
            <ol
              key={column[0]}
              className="list-decimal list-inside space-y-1"
              start={colIndex === 0 ? 1 : columnLength + 1}
            >
              {column.map((name) => (
                <li key={name} className="wrap-break-word">
                  {name}
                </li>
              ))}
            </ol>
          ))}
        </>
      ),
      contentClasses: 'grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 text-sm',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summary.map(({ title, content, contentClasses }) => (
        <SummaryCard key={title} title={title} contentClasses={contentClasses || ''}>
          {content}
        </SummaryCard>
      ))}
    </div>
  );
}
