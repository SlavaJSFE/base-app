import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@ui/card';
import { type SalesRecord } from '../types/SalesRecord';
import { useMemo } from 'react';

export type SalesChartProps = {
  data: SalesRecord[];
};

export function SalesChart({ data }: SalesChartProps) {
  if (!data || data.length === 0) return null;

  const chartData = useMemo(
    () =>
      data.map((item) => ({
        date: item.date,
        sales: item.sum_sales,
        orders: item.count_orders,
      })),
    [data],
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily sales</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
