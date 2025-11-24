import { useMemo } from 'react';
import type { SalesRecord } from '../types/sales';
import { ChannelNameChart } from './ChannelNameChart';
import ChannelTypeChart from './ChannelTypeChart';
import { SalesChart } from './SalesChart';
import { SalesSummary } from './SalesSummary';
import { SalesTable } from './SalesTable';
import { aggregateSales } from '@src/lib/aggregateSales';

export type SalesStatisticsProps = {
  data: SalesRecord[] | undefined;
};

export default function SalesStatistics({ data }: SalesStatisticsProps) {
  if (!data || data.length === 0) return null;

  const channelTypeSales = useMemo(
    () => aggregateSales(data, (item) => item.channel_type, 'channel_type'),
    [data],
  );

  const channelNameSales = useMemo(
    () => aggregateSales(data, (item) => item.channel_name, 'channel_name'),
    [data],
  );

  const channelTypes = useMemo(
    () => Array.from(new Set(channelTypeSales.map((record) => record.channel_type))),
    [channelTypeSales],
  );

  const channelNames = useMemo(
    () => Array.from(new Set(channelNameSales.map((record) => record.channel_name))),
    [channelNameSales],
  );

  return (
    <div className="space-y-8">
      <SalesSummary data={data} channelNames={channelNames} channelTypes={channelTypes} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChannelTypeChart data={channelTypeSales} />
        <ChannelNameChart data={channelNameSales} />
      </div>
      <SalesChart data={data} channelNames={channelNames} />
      <SalesTable data={data} channelNames={channelNames} channelTypes={channelTypes} />
    </div>
  );
}
