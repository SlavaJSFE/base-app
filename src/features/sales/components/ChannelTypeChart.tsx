import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import type { ChannelTypeSalesRecord } from '../types/sales';
import { COLORS } from '@src/constants/common';

export type ChannelTypeChartProps = {
  data: ChannelTypeSalesRecord[];
};

export default function ChannelTypeChart({ data }: ChannelTypeChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales by Channel Type</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="sales" nameKey="channel_type" outerRadius="90%">
              {data.map((_, index) => (
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
