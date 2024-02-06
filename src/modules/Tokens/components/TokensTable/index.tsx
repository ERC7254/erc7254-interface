"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

import CustomTable from "@/components/CustomTable";
import { tokenList } from "@/constants/tokenList";
import { TokenRevenueClaimable } from "@/types/token-revenue";

import s from "./style.module.scss";

export default function TokensTable(): React.ReactElement {
  const columns = useMemo<ColumnDef<TokenRevenueClaimable>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (
          props: CellContext<TokenRevenueClaimable, unknown>,
        ): React.ReactElement => {
          const original = props.row.original;
          const logo = original.logo;
          const name = original.name;
          const symbol = original.symbol;
          const address = original.address;

          return (
            <Flex
              alignItems="center"
              gap={2}
              height="100%"
              _hover={{
                color: "yellow",
              }}
            >
              <Box position="relative" overflow="hidden" borderRadius={50}>
                <Image src={logo} width="20" height="20" alt="logo" />
              </Box>
              <Link href={`/tokens/${address}`}>
                <Text fontSize="sm" fontWeight="bold">
                  {name}
                </Text>
              </Link>
              <Text fontSize="sm" color="#ffffff90">
                ({symbol})
              </Text>
            </Flex>
          );
        },
        size: 50,
      },

      {
        header: "Total Supply",
        accessorKey: "totalSupply",
        size: 20,
      },
      {
        header: "Reward",
        accessorKey: "reward",
        size: 20,
      },
      {
        header: "claim",
        accessorKey: "claim",
        cell: (
          props: CellContext<TokenRevenueClaimable, unknown>,
        ): React.ReactElement => {
          const reward = props.row.original.reward;
          return (
            <Button isDisabled={reward <= 0} size="xs" mb={1}>
              Claim
            </Button>
          );
        },
        size: 10,
      },
    ],
    [],
  );

  return (
    <Card className={s.tokensTable}>
      <TableContainer>
        <CustomTable columns={columns} data={tokenList} size="sm" />
      </TableContainer>
    </Card>
  );
}
