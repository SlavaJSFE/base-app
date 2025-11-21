import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { type SalesRecord } from '../types/SalesRecord';

type Props = {
  data: SalesRecord[] | undefined;
};

export function SalesSummary({ data }: Props) {
  if (!data || data.length === 0) return null;

  const totalSales = data.reduce((acc, record) => acc + record.sum_sales, 0);
  const totalOrders = data.reduce((acc, record) => acc + record.count_orders, 0);

  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  const bestDay = data.reduce((best, record) =>
    record.sum_sales > best.sum_sales ? record : best,
  );

  const uniqueChannelTypes = new Set(data.map((record) => record.channel_type)).size;
  const uniqueChannelNames = new Set(data.map((record) => record.channel_name));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{totalSales.toLocaleString()} zł</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{totalOrders.toLocaleString()}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Avg Order Value</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{avgOrderValue.toFixed(2)} zł</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Best Day</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">{bestDay.date}</div>
          <div className="text-sm text-muted-foreground">
            {bestDay.sum_sales.toLocaleString()} zł
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Channel Types</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{uniqueChannelTypes}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Channels</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{uniqueChannelNames}</CardContent>
      </Card>
    </div>
  );
}
