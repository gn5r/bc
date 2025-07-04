export function flattenToMergedRecord(data: object): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value !== null && typeof value === "object") {
      result[key] = JSON.stringify(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function getKeys<T extends object>(data: T) {
  return Object.keys(data);
}
