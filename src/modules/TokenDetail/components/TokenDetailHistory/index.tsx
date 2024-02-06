"use client";
import { Card, TableContainer, Text } from "@chakra-ui/react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useMemo } from "react";

import CustomTable from "@/components/CustomTable";
import { ITokenHistory, tokenHistory } from "@/constants/tokenHistory";
import { truncateAddress } from "@/utils/truncateAddress";

import s from "./style.module.scss";

export default function TokenDetailHistory(): React.ReactElement {
  const columns = useMemo<ColumnDef<ITokenHistory>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (
          props: CellContext<ITokenHistory, unknown>
        ): React.ReactElement => {
          const original = props.row.original;
          const txHash = original.txHash;

          return (
            <Link href={`https://testnet.blastscan.io/address/${txHash}`}>
              <Text fontSize="sm" fontWeight="bold">
                {truncateAddress(txHash)}
              </Text>
            </Link>
          );
        },
        size: 50,
      },

      {
        header: "Method",
        accessorKey: "method",
        size: 20,
      },
      {
        header: "From",
        accessorKey: "from",
        size: 20,
      },
      {
        header: "To",
        accessorKey: "to",
        cell: (
          props: CellContext<ITokenHistory, unknown>
        ): React.ReactElement => {
          const to = props.row.original.to;
          return (
            <Link href={`https://testnet.blastscan.io/address/${to}`}>
              <Text fontSize="sm" fontWeight="bold">
                {truncateAddress(to)}
              </Text>
            </Link>
          );
        },
        size: 10,
      },
    ],
    []
  );

  return (
    <Card className={s.tokensTable} mb="64px">
      <TableContainer>
        <CustomTable columns={columns} data={tokenHistory} size="sm" />
      </TableContainer>
    </Card>
  );
}
