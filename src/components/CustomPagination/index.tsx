import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToken,
} from "@chakra-ui/react";
import { Table } from "@tanstack/react-table";
import Select from "react-select";

import { pageSizes } from "@/constants/pageSizes";

import SvgInsert from "../SvgInsert";

interface ICustomPagination {
  table?: Table<unknown>; // for FE pagination-simulate only
  totalPages?: number;
  currentPage: number;
  limit?: number;
  onChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function CustomPagination({
  table,
  totalPages = 1,
  currentPage,
  limit,
  onChange,
  onPageSizeChange,
}: ICustomPagination): React.ReactElement {
  const [brandYellow200, brandCamo300, brandCamo200] = useToken("colors", [
    "brand.yellow.200",
    "brand.camo.300",
    "brand.camo.200",
  ]);

  const components = {
    DropdownIndicator: () => (
      <Box p={2}>
        <SvgInsert src="/icons/chevron.svg" />
      </Box>
    ),
  };

  return (
    <Stack
      w="full"
      direction={{ base: "column", md: "row" }}
      gap={2}
      justifyContent="flex-end"
    >
      <Flex
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        w={{ base: "full", md: "unset" }}
      >
        <Button
          size="sm"
          variant="ghost"
          className="border rounded p-1"
          onClick={() => {
            if (table) table?.setPageIndex(0);
            else onChange(1);
          }}
          // isDisabled={!table?.getCanPreviousPage()}
          isDisabled={currentPage <= 1}
        >
          <Text fontSize="sm" fontWeight="bold">
            {"<<"}
          </Text>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border rounded p-1"
          onClick={() => {
            if (table) table.previousPage();
            else onChange(currentPage - 1);
          }}
          // isDisabled={!table?.getCanPreviousPage()}
          isDisabled={currentPage <= 1}
        >
          <Text fontSize="sm" fontWeight="bold">
            {"<"}
          </Text>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border rounded p-1"
          onClick={() => {
            if (table) table.nextPage();
            else onChange(currentPage + 1);
          }}
          // isDisabled={!table?.getCanNextPage()}
          isDisabled={currentPage >= totalPages}
        >
          <Text fontSize="sm" fontWeight="bold">
            {">"}
          </Text>
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="border rounded p-1"
          onClick={() => {
            if (table) table.setPageIndex(table?.getPageCount() - 1);
            else onChange(totalPages);
          }}
          // isDisabled={!table?.getCanNextPage()}
          isDisabled={currentPage >= totalPages}
        >
          <Text fontSize="sm" fontWeight="bold">
            {">>"}
          </Text>
        </Button>
        <Box as="span" className="flex items-center gap-1">
          <Text fontSize="sm" color="brand.camo.200">
            Page
          </Text>
          <Text fontWeight="bold" fontSize="sm" color="brand.camo.100">
            {currentPage || Number(table?.getState().pagination.pageIndex) + 1}{" "}
            of {totalPages || table?.getPageCount()}
          </Text>
        </Box>
      </Flex>

      <Flex gap={2}>
        <Text
          className="flex items-center gap-1"
          fontSize="sm"
          color="brand.camo.200"
        >
          | Go to page:
        </Text>
        <Input
          width={100}
          height="36px"
          variant="filled"
          size="sm"
          type="number"
          defaultValue={
            Number(table?.getState().pagination.pageIndex) + 1 || currentPage
          }
          onChange={(e) => {
            if (table) {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            } else {
              onChange(parseInt(e.target.value));
            }
          }}
        />
        <Select
          onChange={(e) => {
            if (table) table.setPageSize(Number(e?.value));
            else if (limit) onPageSizeChange(Number(e?.value));
          }}
          placeholder={`Show ${limit}`}
          components={components}
          menuPlacement="top"
          options={pageSizes}
          isSearchable={false}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              borderRadius: "25px",
              color: "black",
              padding: "20px",
              primary25: brandCamo300,
              primary: brandYellow200,
            },
            ":hover": {
              padding: "12px",
              borderRadius: "25px",
              borderColor: brandCamo300,
            },
          })}
          styles={{
            menu: (baseStyles) => ({
              ...baseStyles,
              color: "white",
              background: "black",
              borderRadius: "25px",
              padding: "24px",
              width: "200px",
              right: 0,
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "white",
              fontSize: "14px",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: "white",
              fontSize: "14px",
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: "md",
              backgroundColor: state.isFocused ? "transparent" : "#4048337f",
              borderRadius: "25px",
              borderColor: brandCamo300,
              boxShadow: "none",
              height: "32px",
              color: "black !important",
              ":hover": {
                borderColor: brandCamo300,
              },
              ":active": {},
            }),
            menuList: () => ({
              display: "flex",
              flexDirection: "column",
            }),
            option: () => ({
              transition: "all 0.15s ease-in-out",
              cursor: "pointer",
              padding: "8px",
              ":hover": {
                padding: "8px 12px",
                borderRadius: "25px",
                backgroundColor: brandCamo300,
              },
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: brandCamo300,
            }),
            indicatorsContainer: (baseStyles) => ({
              ...baseStyles,
              color: brandCamo300,
              svg: {
                color: brandCamo200,
              },
            }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              paddingLeft: "14px",
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              fontSize: "14px",
            }),
          }}
        />
      </Flex>
    </Stack>
  );
}
