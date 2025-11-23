import type { Route } from '../+types/root';
import { SalesSummary } from '@src/features/sales/components/SalesSummary';
import { fetchSales } from '@src/api/fetchSales';
import { SalesChart } from '@src/features/sales/components/SalesChart';
import { SalesTable } from '@src/features/sales/components/SalesTable';
import ChannelTypeChart from '@src/features/sales/components/ChannelTypeChart';
import { ChannelNameChart } from '@src/features/sales/components/ChannelNameChart';

export async function clientLoader() {
  const response = await fetchSales();

  return response;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const salesData = loaderData;

  return (
    <div className="space-y-8">
      {salesData && (
        <>
          <SalesSummary data={salesData} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChannelTypeChart data={salesData} />
            <ChannelNameChart data={salesData} />
          </div>
          <SalesChart data={salesData} />
          <SalesTable data={salesData} />
        </>
      )}
    </div>
  );
}
