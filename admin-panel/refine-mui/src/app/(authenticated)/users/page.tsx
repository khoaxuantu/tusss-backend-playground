"use client";

import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { ColumnDefHelper } from "@lib/helpers/mui/data-grid.helper";
import { useDataGrid } from "@lib/hooks/mui/use-data-grid";
import { UserShowProps } from "@lib/schemas/user.schema";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { List } from "@refinedev/mui";

const columns: GridColDef[] = [
  ColumnDefHelper.id({ filterable: false }),
  ColumnDefHelper.common({ field: "name", headerName: "Name" }),
  ColumnDefHelper.common({ field: "email", headerName: "Email" }),
  ColumnDefHelper.common({ field: "age", headerName: "Age" }),
  ColumnDefHelper.createdAt(),
];

export default function Page() {
  const { dataGridProps } = useDataGrid<UserShowProps>();

  return (
    <List resource={RESOURCE_IDENTIFIER.USER}>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row: UserShowProps) => row._id}
      />
    </List>
  );
}
