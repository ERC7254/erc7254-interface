"use client";
import { Card, CardFooter, TableContainer, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useCallback, useMemo } from "react";

import CustomPagination from "@/components/CustomPagination";
import CustomTable from "@/components/CustomTable";
import { ITokenHistory } from "@/constants/tokenHistory";
import tokensService from "@/httpClients";
import { PaginationResponse } from "@/httpClients/types";
import { tTokenRevenue } from "@/types/token-revenue";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { truncateAddress } from "@/utils/truncateAddress";

import s from "./style.module.scss";

interface TokenDetailHistoryProps {
  tokenAddress: string | `0x${string}`;
}

export default function TokenDetailHistory({
  tokenAddress,
}: TokenDetailHistoryProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getTokenHistoryFetcher = (
    query: ReadonlyURLSearchParams
  ): {
    key: (string | number)[];
    fetcher: () => Promise<PaginationResponse<tTokenRevenue>>;
  } => {
    const chainId = process.env.NEXT_PUBLIC_CHAINID;
    const limit = Number(query.get("limit")) || 10;
    const page = Number(query.get("page")) || 1;

    const key = ["TokenHistory", page, limit, tokenAddress];
    const fetcher = async (): Promise<PaginationResponse<tTokenRevenue>> => {
      const res = await tokensService.getTokenHistory({
        chainId,
        page,
        limit,
        tokenAddress,
      });
      return res;
    };

    return { key, fetcher };
  };

  const tokenHistoryFetcher = getTokenHistoryFetcher(searchParams);

  const {
    data: tokenHistory,
    // refetch: tokenHistoryRefetch,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: tokenHistoryFetcher.key,
    queryFn: tokenHistoryFetcher.fetcher,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const columns = useMemo<ColumnDef<ITokenHistory>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (
          props: CellContext<ITokenHistory, unknown>
        ): React.ReactElement => {
          const original = props.row.original;
          const txHash = original.transactionHash;
          const name = original.tokenAddress?.name;

          return (
            <Link href={`https://testnet.blastscan.io/address/${txHash}`}>
              <Text fontSize="sm" fontWeight="bold">
                {name}
              </Text>
            </Link>
          );
        },
        size: 20,
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: (
          props: CellContext<ITokenHistory, unknown>
        ): React.ReactElement => {
          const amount = props.row.original.value;
          return <Text fontSize="sm">{formatBigNumber(amount)}</Text>;
        },
        size: 20,
      },
      {
        header: "From",
        accessorKey: "from",
        cell: (
          props: CellContext<ITokenHistory, unknown>
        ): React.ReactElement => {
          const from = props.row.original.from;
          return (
            <Link href={`https://testnet.blastscan.io/address/${from}`}>
              <Text fontSize="sm" fontWeight="bold">
                {truncateAddress(from)}
              </Text>
            </Link>
          );
        },
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
      {
        header: "Create at",
        accessorKey: "timestamp",
        cell: (
          props: CellContext<ITokenHistory, unknown>
        ): React.ReactElement => {
          const timestamp = props.row.original.blockTime;
          return <Text fontSize="sm">{timestamp}</Text>;
        },
        size: 20,
      },
    ],
    []
  );

  return (
    <Card className={s.tokensTable} mb="64px">
      <TableContainer>
        <CustomTable
          columns={columns}
          data={tokenHistory?.data}
          size="sm"
          pageSize={Number(searchParams.get("limit")) || 10}
          isLoading={isLoading}
        />
      </TableContainer>
      <CardFooter>
        <CustomPagination
          currentPage={Number(searchParams.get("page")) || 1}
          totalPages={tokenHistory?.totalPages}
          onChange={(p) => {
            router.push(
              pathname + "?" + createQueryString("page", p.toString())
            );
          }}
          limit={Number(searchParams.get("limit")) || 10}
          onPageSizeChange={(p) => {
            router.push(
              pathname + "?" + createQueryString("limit", p.toString())
            );
          }}
        />
      </CardFooter>
    </Card>
  );
}
