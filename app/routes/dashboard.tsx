import type { Route } from '../+types/root';
import { fetchSales } from '@src/api/fetchSales';
import SalesStatistics from '@src/features/sales/components/SalesStatistics';

export async function clientLoader() {
  const response = await fetchSales();

  return response;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const salesData = loaderData;

  return (
    <div className="space-y-8">
      <SalesStatistics data={salesData} />
    </div>
  );
}
