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
import { useAccount } from "wagmi";

import CustomPagination from "@/components/CustomPagination";
import CustomTable from "@/components/CustomTable";
import tokensService from "@/httpClients";
import { PaginationResponse } from "@/httpClients/types";
import { Link } from "@/libs/router-events";
import { tTokenRevenue } from "@/types/token-revenue";

import RewardCell from "../RewardCell";
import s from "./style.module.scss";

const getOwnedTokenListFetcher = (
  query: ReadonlyURLSearchParams,
  userAddress?: `0x${string}`
): {
  key: (string | number)[];
  fetcher: () => Promise<PaginationResponse<tTokenRevenue>>;
} => {
  const chainId = process.env.NEXT_PUBLIC_CHAINID;
  const limit = Number(query.get("limit")) || 10;
  const page = Number(query.get("page")) || 1;

  const key = ["OwnedTokensPage", page, limit, userAddress as string];
  const fetcher = async (): Promise<PaginationResponse<tTokenRevenue>> => {
    const res = await tokensService.getOwnedTokenList({
      chainId,
      userAddress,
      page,
      limit,
    });
    return res;
  };

  return { key, fetcher };
};

export default function OwnedTokensTable(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const account = useAccount();
  const userAddress = account.address;

  const tokenListFetcher = getOwnedTokenListFetcher(searchParams, userAddress);

  const {
    data: ownedTokenList,
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
        size: 40,
      },

      {
        header: "Total Supply",
        accessorKey: "totalSupply",
        size: 30,
      },
      {
        header: "Reward",
        accessorKey: "reward",
        cell: (
          props: CellContext<tTokenRevenue, unknown>
        ): React.ReactElement => <RewardCell row={props.row} />,
        size: 30,
      },
    ],
    []
  );

  return (
    <Card className={s.tokensTable}>
      <TableContainer>
        <CustomTable
          isLoading={isLoading}
          columns={columns}
          data={ownedTokenList?.data}
          size="sm"
          hasIndexes
        />
      </TableContainer>
      <CardFooter>
        <CustomPagination
          currentPage={Number(searchParams.get("page")) || 1}
          totalPages={ownedTokenList?.totalPages}
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
