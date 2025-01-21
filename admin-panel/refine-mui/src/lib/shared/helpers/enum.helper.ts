export function enumToArray<T extends number | string>(obj: any): T[] {
  return Object.values<T>(obj);
}
