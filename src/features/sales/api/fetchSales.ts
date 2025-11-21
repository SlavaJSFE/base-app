export async function fetchSales() {
  try {
    const response = await fetch('src/data/dummy-sales.json');
    const data = await response.json();

    return data;
  } catch {
    throw new Error('Failed to fetch sales data');
  }
}
