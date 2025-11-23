export async function fetchSales() {
  try {
    const response = await fetch('/dummy-sales.json');
    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch sales data');
  }
}
