"use client";

import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { ColumnDefHelper } from "@lib/helpers/mui/data-grid.helper";
import { UserShowProps } from "@lib/schemas/user.schema";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { List, useDataGrid } from "@refinedev/mui";

const columns: GridColDef[] = [
  ColumnDefHelper.id(),
  ColumnDefHelper.common({ field: "name", headerName: "Name" }),
  ColumnDefHelper.common({ field: "email", headerName: "Email" }),
  ColumnDefHelper.common({ field: "age", headerName: "Age" }),
  ColumnDefHelper.createdAt(),
];

export default function Page() {
  const dataGrid = useDataGrid<UserShowProps>({ queryOptions: { retry: 0 } });
  const dataGridProps = dataGrid.dataGridProps;

  return (
    <List resource={RESOURCE_IDENTIFIER.USER}>
      <DataGrid
        {...(dataGridProps as any)}
        columns={columns}
        getRowId={(row: UserShowProps) => row._id}
      />
    </List>
  );
}
