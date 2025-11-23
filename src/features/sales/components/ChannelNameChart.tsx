import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import type { SalesRecord } from '@src/features/sales/types/SalesRecord';
// import { useEffect } from 'react';

interface ChannelNameChartProps {
  data: SalesRecord[];
}

export type AgregatedData = {
  channel_name: string;
  sales: number;
};

export function ChannelNameChart({ data }: ChannelNameChartProps) {
  const aggregated = Object.values(
    data.reduce<Record<string, AgregatedData>>((acc, item) => {
      const key = item.channel_name?.trim() || 'Unknown';

      if (!acc[key]) {
        acc[key] = { channel_name: key, sales: 0 };
      }

      acc[key].sales += item.sum_sales;

      return acc;
    }, {}),
  );

  aggregated.sort((a: AgregatedData, b: AgregatedData) => b.sales - a.sales);

  //   useEffect(() => {
  //     aggregated.sort((a: AgregatedData, b: AgregatedData) => b.sales - a.sales);
  //   }, [aggregated]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales by Channel Name</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={aggregated} responsive>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="channel_name"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={0}
              textAnchor="middle"
            />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)} PLN`}
              labelFormatter={(label) => `Channel: ${label}`}
            />
            <Bar dataKey="sales" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
