export function sanitizeObject(params: any) {
  return JSON.parse(JSON.stringify(params));
}

export function parseDirtyValues<
  TDirtyFields extends Partial<Record<string, unknown>>,
  TValues extends Partial<Record<keyof TDirtyFields, unknown>>,
>(dirtyFields: TDirtyFields, values: TValues, originalValues?: TValues): Partial<TValues> {
  if (!originalValues) return {};

  return Object.keys(values).reduce((prev, currentKey) => {
    if (
      typeof originalValues[currentKey] === "number" &&
      parseInt(values[currentKey] as string) != originalValues[currentKey]
    )
      return { ...prev, [currentKey]: values[currentKey] };

    if (!dirtyFields[currentKey] || values[currentKey] == originalValues[currentKey]) return prev;

    if (Array.isArray(values[currentKey]) || typeof values[currentKey] !== "object")
      return { ...prev, [currentKey]: values[currentKey] };

    return {
      ...prev,
      [currentKey]: parseDirtyValues(
        dirtyFields[currentKey] as TDirtyFields,
        values[currentKey] as TValues,
        originalValues,
      ),
    };
  }, {});
}
