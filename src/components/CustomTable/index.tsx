"use client";

import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import CustomPagination from "../CustomPagination";
import SvgInsert from "../SvgInsert";

interface ICustomTable {
  columns: ColumnDef<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  pageSize?: number;
  size?: "sm" | "md" | "lg";
  hasIndexes?: boolean;
}

export default function CustomTable({
  columns,
  data,
  pageSize = 10,
  size = "sm",
  hasIndexes = false,
}: ICustomTable): React.ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <>
      <Table size={size} mb={6}>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {hasIndexes && <Th>#</Th>}
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    width={`${header.getSize()}%`}
                  >
                    {header.isPlaceholder ? null : (
                      <Flex
                        alignItems="center"
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <SvgInsert src="/icons/chevron.svg" />,
                          desc: (
                            <Box transform={"rotate(180deg)"}>
                              <SvgInsert src="/icons/chevron.svg" />
                            </Box>
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <SvgInsert src="/icons/component.svg" />
                        )}
                      </Flex>
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <Tr key={row.id}>
                {hasIndexes && (
                  <Td>
                    <Text>{index + 1}</Text>
                  </Td>
                )}
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <CustomPagination table={table} />
    </>
  );
}
