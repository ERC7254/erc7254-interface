import { Text } from "@chakra-ui/react";
import { Row } from "@tanstack/react-table";
import React from "react";
import { useReadContract } from "wagmi";

import { TokenRevenueAbi } from "@/abis/ITokenrevenue";
import { tTokenRevenue } from "@/types/token-revenue";
import { tokenMapping } from "@/utils/tokenMapping";

interface RewardTokenCellProps {
  row: Row<tTokenRevenue>;
}

export default function RewardTokenCell({
  row,
}: RewardTokenCellProps): React.ReactElement {
  const tokenAddress = row.original.token.id as `0x${string}`;
  const res = useReadContract({
    chainId: 168587773,
    abi: TokenRevenueAbi,
    address: tokenAddress,
    functionName: "tokenReward",
  });

  const rewardTokenName = tokenMapping(res?.data as string);

  return <Text fontSize="sm">{rewardTokenName}</Text>;
}
