export function sanitizeParams(params: any) {
  return JSON.parse(JSON.stringify(params));
}

export function parseDirtyValues<
  TDirtyFields extends Partial<Record<string, unknown>>,
  TValues extends Partial<Record<keyof TDirtyFields, unknown>>,
>(dirtyFields: TDirtyFields, values: TValues, originalValues?: TValues): Partial<TValues> {
  if (!originalValues ) return {};

  return Object.keys(dirtyFields).reduce((prev, currentKey) => {
    if (!dirtyFields || values[currentKey] == originalValues[currentKey]) return prev;

    return {
      ...prev,
      [currentKey]:
        typeof values[currentKey] === "object"
          ? parseDirtyValues(
              dirtyFields[currentKey] as TDirtyFields,
              values[currentKey] as TValues,
              originalValues,
            )
          : values[currentKey],
    };
  }, {});
}
