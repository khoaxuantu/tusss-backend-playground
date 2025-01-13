"use client";

import { RESOURCE_IDENTIFIER } from "@lib/constants/resource";
import { ColumnDefHelper, FilterOperatorMapper } from "@lib/helpers/mui/data-grid.helper";
import { useDataGrid } from "@lib/hooks/mui/use-data-grid";
import { UserShowProps } from "@lib/schemas/user.schema";
import { DataGrid, getGridDateOperators, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { List } from "@refinedev/mui";

const columns: GridColDef[] = [
  ColumnDefHelper.id({ filterable: false }),
  ColumnDefHelper.common({
    field: "name",
    headerName: "Name",
    filterOperators: FilterOperatorMapper.getGridStringOperators(),
  }),
  ColumnDefHelper.common({
    field: "email",
    headerName: "Email",
    filterOperators: FilterOperatorMapper.getGridStringOperators(),
  }),
  ColumnDefHelper.common({
    field: "age",
    headerName: "Age",
    type: "number",
    filterOperators: FilterOperatorMapper.getGridNumericOperators(),
  }),
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
        slots={{ toolbar: GridToolbar }}
      />
    </List>
  );
}
