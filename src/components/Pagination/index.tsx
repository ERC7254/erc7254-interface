"use client";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import usePagination from "@Hooks/common/usePagination";
import React, { useState } from "react";

import { checkIsNumber } from "@/utils/checkIsNumber";

interface IIPagination {
  amount: number;
  onChange: (page: number) => void;
  currentPage: number;
  disabled?: boolean;
}

export default function Pagination({
  amount,
  onChange,
  currentPage,
  disabled,
  ...rest
}: IIPagination): React.ReactElement {
  const { data, onClickPage } = usePagination({
    currentPage,
    setCurrentPage: (p) => {
      onChange(p);
    },
    amount,
  });

  const colorButton = "paragraph.accent.400";
  const bgActive = "primary.purple.500";
  const [goToPage, setGoToPage] = useState("");
  const handleChangeGoTo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (checkIsNumber(e.target.value)) {
      setGoToPage(e.target.value);
      return;
    }
    setGoToPage("");
  };
  const handleLoadPage = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key == "Enter") {
      if (Number(goToPage) < 1) {
        onChange(1);
        return;
      }
      if (Number(goToPage) > amount) {
        onChange(amount);
        return;
      }
      onChange(Number(goToPage));
      setGoToPage("");
    }
  };

  if (amount <= 1) return <Box></Box>;
  return (
    <Center
      justifyContent={{
        base: "center",
        md: "center",
        lg: "flex-end",
      }}
      pt={{
        base: "1.875rem",
        md: 6,
      }}
      px={{
        md: 0,
      }}
      gap={2}
      flexDirection={{
        base: "column",
        md: "row",
      }}
      {...rest}
    >
      <HStack w={{ base: "full", md: "auto" }}>
        <Button
          disabled={disabled || currentPage === 1}
          variant="unstyled"
          onClick={() => onChange(currentPage - 1)}
        >
          {"<"}
        </Button>

        <Flex
          marginInlineStart="0!important"
          flexWrap="wrap"
          justifyContent="center"
        >
          {React.Children.toArray(
            data.map((value) => {
              return (
                <Button
                  disabled={disabled || value === "..."}
                  key={`pagination-${value}`}
                  variant="ghost"
                  onClick={() => onClickPage(value)}
                  bg={currentPage === value ? bgActive : undefined}
                  color={currentPage === value ? "white" : colorButton}
                >
                  {value}
                </Button>
              );
            }),
          )}
        </Flex>

        <Button
          disabled={disabled || currentPage === amount}
          marginInlineStart="0!important"
          variant="unstyled"
          onClick={() => onChange(currentPage + 1)}
        >
          {">"}
        </Button>
        <Box
          display={{
            base: "none",
            md: "block",
          }}
        >
          <Divider
            orientation="vertical"
            height="1rem"
            bg="divided.accent.300"
          />
        </Box>
      </HStack>
      <HStack w={{ base: "full", md: "auto" }} justifyContent={"center"} pl={4}>
        <Text color="brand.camo.200" fontSize="sm">
          Go to
        </Text>
        <Input
          disabled={disabled}
          maxWidth="64px"
          maxHeight="32px"
          borderColor="divided.accent.200"
          borderRadius="lg"
          value={goToPage}
          /*   defaultValue="1" */
          color="brand.camo.100"
          onKeyDown={(e) => handleLoadPage(e)}
          onChange={(e) => handleChangeGoTo(e)}
        />
      </HStack>
    </Center>
  );
}
