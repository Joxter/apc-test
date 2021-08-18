export function queryFromObject(obj: Record<string, unknown>): string {
  const result = new URLSearchParams();
  Object.entries(obj).forEach(([key, value]) => result.append(key, value));
  return result.toString();
}
