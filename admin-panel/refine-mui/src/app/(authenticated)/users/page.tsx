"use client";

import { ColumnDefHelper, FilterOperatorMapper } from "@lib/mui/helpers/data-grid.helper";
import { useDataGrid } from "@lib/mui/hooks/use-data-grid";
import { RESOURCE_IDENTIFIER } from "@lib/resource/constants";
import { UserShowProps } from "@lib/user/schemas";
import { Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { List, ShowButton } from "@refinedev/mui";

const columns: GridColDef[] = [
  ColumnDefHelper.id({ filterable: false }),
  ColumnDefHelper.common({
    field: "actions",
    headerName: "Actions",
    renderCell: function render({ row }) {
      return <ShowButton size="small" recordItemId={row._id} />;
    },
  }),
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
    align: "left",
    headerAlign: "left",
  }),
  ColumnDefHelper.createdAt(),
];

export default function Page() {
  const { dataGridProps } = useDataGrid<UserShowProps>();

  return (
    <List
      resource={RESOURCE_IDENTIFIER.USER}
      wrapperProps={{ elevation: 0 }}
      title={<Typography variant="h2">Users</Typography>}
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        getRowId={(row: UserShowProps) => row._id}
        slots={{ toolbar: GridToolbar }}
      />
    </List>
  );
}
