/* eslint-disable */
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useSortBy, useTable } from "react-table";

import SvgInsert from "../SvgInsert";

interface ICustomTable {
  columns: any;
  data: any;
}

export default function CustomTable({ columns, data }: ICustomTable) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const firstPageRows = rows.slice(0, 3);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                userSelect="none"
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                <Flex alignItems="center">
                  {column.render("Header")}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <SvgInsert src="/icons/chevron.svg" />
                    ) : (
                      <Box transform={"rotate(180deg)"}>
                        <SvgInsert src="/icons/chevron.svg" />
                      </Box>
                    )
                  ) : (
                    <SvgInsert src="/icons/component.svg" />
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {firstPageRows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
