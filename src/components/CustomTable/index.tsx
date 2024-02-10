"use client";

import {
  Box,
  Flex,
  Skeleton,
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

import SvgInsert from "../SvgInsert";

interface ICustomTable {
  columns: ColumnDef<any>[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  data?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  pageSize?: number;
  size?: "sm" | "md" | "lg";
  hasIndexes?: boolean;
  isLoading?: boolean;
}

export default function CustomTable({
  columns,
  data = [],
  pageSize = 10,
  size = "sm",
  hasIndexes = false,
  isLoading,
}: ICustomTable): React.ReactElement {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize || 10,
      },
    },
  });

  return (
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
                      mb={2}
                      alignItems="center"
                      gap={2}
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
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
        {isLoading
          ? [...Array(5)].map((_, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <Tr key={index}>
                  {hasIndexes && (
                    <Td>
                      <Skeleton height="35px" />
                    </Td>
                  )}
                  {[...Array(4)].map((_, innerIndex) => {
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <Td key={innerIndex}>
                        <Skeleton height="35px" />
                      </Td>
                    );
                  })}
                </Tr>
              );
            })
          : table.getRowModel().rows.map((row, index) => {
              return (
                <Tr
                  key={row.id}
                  transition="all 0.15s ease-out"
                  _hover={{
                    bg: "brand.camo.300",
                  }}
                >
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
                          cell.getContext(),
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
      </Tbody>
    </Table>
  );
}
