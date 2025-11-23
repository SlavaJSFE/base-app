export function splitArray<T>(array: T[], parts: number): { columnLength: number; columns: T[][] } {
  const result: T[][] = [];
  const chunkSize = Math.ceil(array.length / parts);

  for (let i = 0; i < parts; i++) {
    const start = i * chunkSize;
    const end = start + chunkSize;
    result.push(array.slice(start, end));
  }

  return {
    columnLength: result[0].length,
    columns: result,
  };
}
