export function normalizeName(name: string): string {
  return name === 'Unknown' ? '—' : name;
}
