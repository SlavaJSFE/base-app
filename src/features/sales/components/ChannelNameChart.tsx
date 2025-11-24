import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import type { ChannelNameSalesRecord } from '@src/features/sales/types/sales';

interface ChannelNameChartProps {
  data: ChannelNameSalesRecord[];
}

export function ChannelNameChart({ data }: ChannelNameChartProps) {
  const sortedData = [...data].sort(
    (a: ChannelNameSalesRecord, b: ChannelNameSalesRecord) => b.sales - a.sales,
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales by Channel Name</CardTitle>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} responsive>
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
