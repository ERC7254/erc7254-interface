"use client";
import { Card, CardFooter, Flex, TableContainer, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useCallback, useMemo } from "react";

import CustomPagination from "@/components/CustomPagination";
import CustomTable from "@/components/CustomTable";
import tokensService from "@/httpClients";
import { PaginationResponse } from "@/httpClients/types";
import { tTokenRevenue } from "@/types/token-revenue";

import RewardTokenCell from "../RewardTokenCell";
import s from "./style.module.scss";
import { Link } from "@/libs/router-events";

const getTokenListFetcher = (
  query: ReadonlyURLSearchParams
): {
  key: (string | number)[];
  fetcher: () => Promise<PaginationResponse<tTokenRevenue>>;
} => {
  const chainId = process.env.NEXT_PUBLIC_CHAINID;
  const limit = Number(query.get("limit")) || 10;
  const page = Number(query.get("page")) || 1;

  const key = ["TokensPage", page, limit];
  const fetcher = async (): Promise<PaginationResponse<tTokenRevenue>> => {
    const res = await tokensService.getTokenList({
      chainId,
      page,
      limit,
    });
    return res;
  };

  return { key, fetcher };
};

export default function TokensTable(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tokenListFetcher = getTokenListFetcher(searchParams);

  const {
    data: tokenList,
    // refetch: tokenListRefetch,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: tokenListFetcher.key,
    queryFn: tokenListFetcher.fetcher,
  });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // const formattedTokenList = useMemo<any[]>(() => {
  //   tokenList.map((token) => {

  //     token.tokenReward =
  //   })
  // }, [tokenList]);

  const columns = useMemo<ColumnDef<tTokenRevenue>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (
          props: CellContext<tTokenRevenue, unknown>
        ): React.ReactElement => {
          const original = props.row.original;
          const token = original.token;
          const name = token.name;
          const symbol = token.symbol;
          const address = token.id;

          return (
            <Link href={`/tokens/${address}`}>
              <Flex
                alignItems="center"
                gap={2}
                height="100%"
                _hover={{
                  color: "yellow",
                }}
              >
                {/* <Box position="relative" overflow="hidden" borderRadius={50}>
                <Image src={logo} width="20" height="20" alt="logo" />
              </Box> */}
                <Text fontSize="sm" fontWeight="bold">
                  {name}
                </Text>
                <Text fontSize="sm" color="#ffffff90">
                  ({symbol})
                </Text>
              </Flex>
            </Link>
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
        header: "Reward Token",
        accessorKey: "rewardToken",
        size: 20,
        cell: (
          props: CellContext<tTokenRevenue, unknown>
        ): React.ReactElement => <RewardTokenCell row={props.row} />,
      },
      {
        header: "Create at",
        accessorKey: "timestamp",
        cell: (
          props: CellContext<tTokenRevenue, unknown>
        ): React.ReactElement => {
          const timestamp = props.row.original.blockTimestamp;
          // const date = formatDate(timestamp);
          return <Text fontSize="sm">{timestamp}</Text>;
        },
        size: 10,
      },
    ],
    []
  );

  return (
    <Card className={s.tokensTable}>
      <TableContainer>
        <CustomTable
          columns={columns}
          data={tokenList?.data}
          size="sm"
          pageSize={Number(searchParams.get("limit")) || 10}
          isLoading={isLoading}
        />
      </TableContainer>
      <CardFooter>
        <CustomPagination
          currentPage={Number(searchParams.get("page")) || 1}
          totalPages={tokenList?.totalPages}
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
