import { GridColDef } from "@mui/x-data-grid";

/**
 * I would not recommend create methods based on type properties, i.e date(), number().
 * Because it may cause too many spread operations.
 */
export class ColumnDefHelper {
  static common(props: GridColDef): GridColDef {
    return {
      minWidth: 250,
      ...props,
    }
  }

  static id(props?: Partial<GridColDef>): GridColDef {
    return ColumnDefHelper.common({
      ...props,
      field: "_id",
      headerName: "Id",
    });
  }

  static createdAt(props?: Partial<GridColDef>): GridColDef {
    return ColumnDefHelper.common({
      ...props,
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      valueGetter: (value: any) => value && new Date(value),
    });
  }
}
