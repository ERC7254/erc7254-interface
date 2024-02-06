"use client";
import { Button, Card, TableContainer } from "@chakra-ui/react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
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
          props: CellContext<TokenRevenueClaimable, unknown>
        ): React.ReactElement => {
          const reward = props.row.original.reward;
          return (
            <Button isDisabled={reward <= 0} size="sm">
              Claim
            </Button>
          );
        },
        size: 10,
      },
    ],
    []
  );

  return (
    <Card className={s.tokensTable}>
      <TableContainer>
        <CustomTable columns={columns} data={tokenList} size="sm" />
      </TableContainer>
    </Card>
  );
}
