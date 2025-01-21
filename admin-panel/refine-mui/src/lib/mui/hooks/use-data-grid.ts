import { BaseRecord, HttpError } from "@refinedev/core";
import { UseDataGridProps, useDataGrid as useDataGridRefine } from "@refinedev/mui";

export function useDataGrid<
  TQueryFnData extends BaseRecord = BaseRecord,
  TError extends HttpError = HttpError,
  TSearchVariables = unknown,
  TData extends BaseRecord = TQueryFnData,
>(opts?: UseDataGridProps<TQueryFnData, TError, TSearchVariables, TData>) {
  const hook = useDataGridRefine<TQueryFnData, TError, TSearchVariables, TData>({
    queryOptions: { retry: 0 },
    errorNotification: (err, values, resource) => {
      let description = `Failed to fetch ${resource}.`;
      if (err?.statusCode) description += ` (status code: ${err.statusCode})`;

      return {
        message: err?.message ?? "",
        description,
        type: "error",
      };
    },
    ...opts,
  });

  return hook;
}
