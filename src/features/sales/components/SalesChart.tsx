import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import { useMemo } from 'react';
import type { SalesRecord } from '../types/sales';
import { COLORS } from '@src/constants/common';

export type SalesChartProps = {
  data: SalesRecord[];
  channelNames: string[];
};

export type GroupedData = {
  date: string;
  [channelName: string]: number | string;
};

export function SalesChart({ data, channelNames }: SalesChartProps) {
  const chartData = useMemo(() => {
    const grouped: Record<string, GroupedData> = {};

    data.forEach((item) => {
      const date = item.date;
      const channel = item.channel_name?.trim() || 'Unknown';

      if (!grouped[date]) {
        grouped[date] = { date } as GroupedData;
      }

      grouped[date][channel] =
        ((grouped[date][channel] as number | undefined) || 0) + item.sum_sales;
    });

    return Object.values(grouped).sort(
      (a: GroupedData, b: GroupedData) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
  }, [data]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Sales by Channel</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {channelNames.map((channel, index) => (
              <Line
                key={channel}
                type="monotone"
                dataKey={channel}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
