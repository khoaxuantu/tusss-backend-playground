"use client";

import { HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ColumnFilter } from "@components/DataDisplay/ColumnFilter";
import { Pagination } from "@components/Pagination";
import { capitalize } from "@lib/helpers/string.helper";
import { DateField, EditButton, List, ShowButton, TagField, TextField } from "@refinedev/chakra-ui";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { useMemo } from "react";
import { LIST_PROPS_AS_TEXT, UserProps } from "./schema/user.schema";

export default function UsersPage() {
  const columns = useMemo<ColumnDef<UserProps>[]>(
    () => [
      {
        id: "_id",
        header: "ID",
        accessorKey: "_id",
        meta: {
          filterOperator: "eq",
        },
      },
      ...LIST_PROPS_AS_TEXT.map((field) => ({
        id: field,
        header: capitalize(field),
        accessorKey: field,
      })),
      {
        id: "roles",
        header: "Roles",
        accessorKey: "roles",
        cell: (props) => {
          return (
            <HStack>
              {(props.getValue() as string[]).map((role: string, index) => (
                <TagField key={index} value={role} />
              ))}
            </HStack>
          );
        },
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        cell: (props) => <DateField value={props.getValue() as string} format="HH:mm DD/MM/YYYY" />,
      },
      {
        id: "actions",
        header: "Actions",
        accessorKey: "_id",
        cell: (props) => {
          return (
            <HStack>
              <EditButton recordItemId={props.getValue() as string} />
              <ShowButton recordItemId={props.getValue() as string} />
            </HStack>
          );
        },
      },
    ],
    [],
  );

  const {
    getHeaderGroups,
    getRowModel,
    refineCore: { tableQuery, pageCount, current, setCurrent },
  } = useTable<UserProps>({ columns });

  console.log("🚀 ~ UsersPage ~ Render", tableQuery);
  const total = tableQuery?.data?.total ?? 0;

  return (
    <List>
      <p>Total: {total}</p>
      <TableContainer marginTop={12}>
        <Table variant="simple">
          <Thead>
            {getHeaderGroups().map((headerGroup) => {
              return (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th key={header.id}>
                        {!header.isPlaceholder && (
                          <HStack spacing={2}>
                            <TextField
                              value={flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                            />
                            <ColumnFilter<UserProps> column={header.column} />
                          </HStack>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              );
            })}
          </Thead>
          <Tbody>
            {getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination current={current} pageCount={pageCount} setCurrent={setCurrent} />
    </List>
  );
}
