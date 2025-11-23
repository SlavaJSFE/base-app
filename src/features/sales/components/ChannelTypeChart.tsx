import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import type { SalesRecord } from '../types/SalesRecord';
import { COLORS } from '@src/constants/common';

export type ChannelTypeChartProps = {
  data: SalesRecord[];
};

export type AgregatedData = {
  channel_type: string;
  sales: number;
};

export default function ChannelTypeChart({ data }: ChannelTypeChartProps) {
  if (!data || data.length === 0) return null;

  const aggregated = Object.values(
    data.reduce<Record<string, AgregatedData>>((acc, item) => {
      const key = item.channel_type || 'Unknown';

      if (!acc[key]) {
        acc[key] = { channel_type: key, sales: 0 };
      }
      acc[key].sales += item.sum_sales;

      return acc;
    }, {}),
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales by Channel Type</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={aggregated} dataKey="sales" nameKey="channel_type" outerRadius="90%">
              {aggregated.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value.toFixed(2)} PLN`}
              labelFormatter={(label) => `Channel type: ${label}`}
            />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
