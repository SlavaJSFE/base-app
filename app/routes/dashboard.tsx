import type { Route } from '../+types/root';
import { SalesSummary } from '@src/features/sales/components/SalesSummary';
import { fetchSales } from '@src/features/sales/api/fetchSales';
import { SalesChart } from '@src/features/sales/components/SalesChart';

export async function clientLoader() {
  const response = await fetchSales();

  return response;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const salesData = loaderData;

  return (
    <div className="space-y-8">
      <SalesSummary data={salesData} />
      <SalesChart data={salesData || []} />
    </div>
  );
}
