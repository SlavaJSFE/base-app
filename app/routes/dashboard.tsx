import { SalesSummary } from '@src/features/sales/components/SalesSummary';
import { fetchSales } from '@src/features/sales/api/fetchSales';
import type { Route } from '../+types/root';

export async function clientLoader() {
  const response = await fetchSales();

  return response;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  const salesData = loaderData;

  return (
    <div className="space-y-8">
      <SalesSummary data={salesData} />
    </div>
  );
}
